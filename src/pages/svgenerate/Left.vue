<template>
  <div class=" w-full h-full bg-[#FFFFFF] dark:bg-[#222] flex flex-col items-center">
    <div class=" bg-[#f7f7f7] dark:bg-[#222222] dark:border-[#444444] w-full h-20 border border-r-0 border-[#e0e1e4] flex-center">
      <input
        id="input"
        v-model="keyWord"
        :placeholder="t('svgenerate.search-icon')"
        :aria-label="t('svgenerate.search-icon')"
        type="text"
        autocomplete="false"
        p="x4 y2"
        w="80%"
        h="60%"
        text="center"
        bg="#FFFFFF"
        class=" dark:bg-[#282828]"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        @keydown.enter="search"
      >

    </div>

    <div class="flex-1 py-4 overflow-auto flex flex-wrap content-start " >
      <div class=" w-30 h-30 text-center cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-[#282828]" @click="handleClick(item)"  v-for="(item) in iconList">

        <div style="font-size:30px" class=" w-[30px] h-[30px] mx-auto flex flex-row items-center justify-center mt-[25px] mb-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            :viewBox=viewBox
            >
            <g v-html="item.body" >
            </g>
          </svg>
        </div>

        <div class="w-[90px] mx-auto" style="font-size: 0.25rem;">{{item.name}}</div>
      </div>
    </div>

    <!-- <div v-bind="containerProps" style="height: 300px">
      <div v-bind="wrapperProps">
        <div v-for="item in list" :key="item.index" class="mb-8" style="height: 22px">
          <img class=" mx-auto " :src="item.data" alt="">
        </div>
      </div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';

// let url = 'https://i.picsum.photos/id/490/40/40.jpg?hmac=CVLndRKw3fiJ7f4AfCUItGooiUnv2ht9Z0v21Tdfb9g'
// const { list, containerProps, wrapperProps } = useVirtualList(
//   new Array(250).fill(url),
//   {
//     itemHeight: 22,
//   },
// )

const { t } = useI18n()
const keyWord = $ref('')
const search = () => {
  if (keyWord)
    console.log("检索");
}
const store = useSvgenerateStore()
const storeSvg = useSvgStore()

/** icon 的尺寸 */
const viewBox = ref('0 0 32 32')
const handleClick = (svgObj:any) => {
  let obj = {
    name:svgObj.name,
    body:svgObj.body,
    width:svgObj.width,
    height:svgObj.height,
    property:{
      stokeColor:'',
      stokeWidth:0,
      fillColor:''
    }
  }
  store.setCurrentSvg(obj)

  storeSvg.resetSvgStore()
}
onMounted(()=>{
  fetchData()
})
const iconList = ref()
const fetchData = () => {
  axios.get('http://localhost:3200/form/fetchSvgFromIconify').then((res:any) => {
    let { icons,height,width } = res.data
    viewBox.value = `0 0 ${width} ${height}`

    let keysArr = Object.keys(icons)
    let result = keysArr.map((i:string) => {
      return {
        name:i,
        width,
        height,
        body:icons[i].body
      }
    })
    iconList.value = result.slice(0,10)
    // console.log(result);
  })
}

</script>
