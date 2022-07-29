<template>
  <div class=" w-full h-full bg-[#FFFFFF] dark:bg-[#222] flex flex-col items-center">
    <div
      class=" bg-[#f7f7f7] dark:bg-[#222222] dark:border-[#444444] w-full h-20 border border-r-0 border-[#e0e1e4] flex-center">
      <input id="input" v-model="keyWord" :placeholder="placeHolderText"
        :aria-label="t('svgenerate.search-icon')" type="text" autocomplete="false" p="x4 y2" w="80%" h="60%"
        text="center" bg="#FFFFFF" class=" dark:bg-[#282828]" border="~ rounded gray-200 dark:gray-700"
        outline="none active:none" @keydown.enter="search">

    </div>

    <div class="flex-1 py-4 overflow-auto flex flex-wrap content-start ">

      <div v-bind="containerProps" style="height:100%" class="overflow-auto  rounded">
        <div v-bind="wrapperProps">
          <div v-for="{ index, data } in list" :key="index" :style="{
            height: `${120}px`,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
          }">
            <div @click="handleClick(i)" class=" w-30 h-30 text-center cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-[#282828]"
              v-for="i in data">
              <div style="font-size:30px"
                class=" w-[30px] h-[30px] mx-auto flex flex-row items-center justify-center mt-[25px] mb-[10px]">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                  role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" :viewBox=viewBox>
                  <g v-html="i.body"> </g>
                </svg>
              </div>

              <div class="w-[90px] mx-auto" style="font-size: 0.25rem;">{{ i.name }}</div>
            </div>

          </div>
        </div>
      </div>

    </div>


  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
const store = useSvgenerateStore()
const storeSvg = useSvgStore()
/**
 * 使用 vueuse 的虚拟列表 useVirtualList。
 * 注意点：设置高度和itemHeight
 */

/** icon 的尺寸 */
const viewBox = ref('0 0 32 32')
const handleClick = (svgObj: any) => {
  let obj = {
    name: svgObj.name,
    body: svgObj.body,
    width: svgObj.width,
    height: svgObj.height,
    property: {
      stokeColor: '',
      stokeWidth: 0,
      fillColor: ''
    }
  }
  store.setCurrentSvg(obj)

  storeSvg.resetSvgStore()
}
const iconList = ref()
const fetchData = async () => {
  await axios.get('http://localhost:3200/form/fetchSvgFromIconify').then((res:any) => {
    let { icons,height,width } = res.data
    let keysArr = Object.keys(icons)
    let result = keysArr.map((i:string) => {
      return {
        name:i,
        width,
        height,
        body:icons[i].body
      }
    })
    // iconList.value = result.slice(0,100)
    iconList.value = result
    const sliceBy3 = (arr:Array<any>,result:Array<any> = []) => {
      if(arr.length == 0)
        return
      result.push(arr.splice(0,3))
      sliceBy3(arr,result)
      return result
    }
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
const keyWord = $ref('')
const placeHolderText = ref(t('svgenerate.search-icon') + ' (' + iconList.value.length + ')')
const search = () => {
  if (keyWord)
    console.log("检索");
}





</script>
