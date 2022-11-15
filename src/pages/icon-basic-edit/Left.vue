<script setup lang="ts">
import { symbolFn } from '~/utils/common'
const store = useSvgenerateStore()
const storeSvg = useSvgStore()
/**
 * 使用 vueuse 的虚拟列表 useVirtualList。
 * 注意点：设置高度和itemHeight
 */

/** icon 的尺寸 */
const viewBox = ref('0 0 32 32')
const handleClick = (svgObj: any) => {
  const obj = {
    name: svgObj.name,
    body: svgObj.body,
    width: svgObj.width,
    height: svgObj.height,

    size: 192,
    stokeColor: '',
    stokeWidth: 1,
    fillColor: '',
  }
  store.setCurrentSvg(obj)

  storeSvg.resetSvgStore()
}
const iconList = ref()
/**
 * 将一维数组划分为三个一组的数组
 * @param arr 一维数组
 * @param result 三个一组的数组
 */
const sliceBy3 = (arr: Array<any>, result: Array<any> = []) => {
  if (arr.length === 0)
    return
  result.push(arr.splice(0, 3))
  sliceBy3(arr, result)
  return result
}
const fetchData = async () => {
  await fetch('http://localhost:3200/form/fetchSvgFromIconify', { method: 'GET' })
    .then(res => res.text())
    .then((res: any) => {
      const { icons, height, width } = JSON.parse(res)
      const keysArr = Object.keys(icons)
      const result = keysArr.map((i: string) => {
        return {
          name: i,
          width,
          height,
          body: icons[i].body,
        }
      })
      // iconList.value = result.slice(0,100)
      iconList.value = result
      iconList.value = sliceBy3(iconList.value)
    })
}
await fetchData()

const { list, containerProps, wrapperProps } = useVirtualList(
  iconList,
  {
    itemHeight: 120,
  },
)

/**
 * 检索
 */
const { t } = useI18n()
const keyWord = ref('')
const hasWord = computed(() => Boolean(keyWord.value))
const placeHolderText = ref(`${t('svgenerate.search-icon')} (${iconList.value.length})`)
const searchList = ref<Array<any>>([])
const search = () => {
  fetch(`http://localhost:3200/form/queryIcons?name=${keyWord.value}`, {
    method: 'GET',
  }).then(res => res.text()).then((res) => {
    const { result } = JSON.parse(res)
    searchList.value = result
  })
}
watch(() => hasWord, (v1, v2) => {
  search()
})
</script>

<template>
  <div class=" w-full h-full bg-[#FFFFFF] dark:bg-[#222] flex flex-col items-center">
    <div
      class=" bg-[#f7f7f7] dark:bg-[#222222] dark:border-[#444444] w-full min-h-20 h-20 border border-r-0 border-[#e0e1e4] flex-center"
    >
      <input
        id="input" v-model="keyWord" :placeholder="placeHolderText" :aria-label="t('svgenerate.search-icon')"
        type="text" autocomplete="false" p="x4 y2" w="80%" h="60%" text="center" bg="#FFFFFF" class=" dark:bg-[#282828]"
        border="~ rounded gray-200 dark:gray-700" outline="none active:none" @keydown.enter="search" @input="search"
      >
    </div>

    <!-- 全部的数量较多，虚拟列表 -->
    <div v-show="!hasWord" class="flex-1 py-4 overflow-auto flex flex-wrap content-start ">
      <div v-bind="containerProps" style="height:100%" class="overflow-auto  rounded">
        <div v-bind="wrapperProps">
          <div
            v-for="{ index, data } in list" :key="index"
            class="flex justify-start items-start h-120px"
          >
            <div
              v-for="i in data"
              :key="symbolFn(i)"
              class=" w-30 h-30 text-center cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-[#282828]"
              @click="handleClick(i)"
            >
              <div
                style="font-size:30px"
                class=" w-[30px] h-[30px] mx-auto flex flex-row items-center justify-center mt-[25px] mb-[10px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                  role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" :viewBox="viewBox"
                >
                  <g v-html="i.body" />
                </svg>
              </div>

              <div class="w-[90px] mx-auto" style="font-size: 0.25rem;">
                {{ i.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 检索的，数量较少 -->
    <div v-show="hasWord" class="py-4 overflow-auto flex flex-wrap content-start w-full ">
      <div
        v-for="{ body, name }, idx in searchList"
        :key="symbolFn(idx)"
        class="flex justify-start items-start h-120px"
      >
        <div class=" w-30 h-30 text-center cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-[#282828]" @click="handleClick({ body, name, height: 32, width: 32 })">
          <div
            style="font-size:30px"
            class=" w-[30px] h-[30px] mx-auto flex flex-row items-center justify-center mt-[25px] mb-[10px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
              role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" :viewBox="viewBox"
            >
              <g v-html="body" />
            </svg>
          </div>

          <div class="w-[90px] mx-auto" style="font-size: 0.25rem;">
            {{ name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
