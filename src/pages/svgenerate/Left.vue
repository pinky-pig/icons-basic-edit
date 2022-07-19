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
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        @keydown.enter="search"
      >

    </div>


    <div class="flex-1 py-4 overflow-auto flex flex-row flex-wrap justify-center ">
      <div class=" w-30 h-30 flex flex-col justify-center items-center cursor-pointer hover:bg-[#f7f7f7] " @click="handleClick(item)"  v-for="(item) in iconList">

        <div class=" w-[30px] h-[30px] flex flex-row items-center justify-center">
          <svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g v-html="item.body"></g>
          </svg>
        </div>

        <div style="font-size: 0.25rem;">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';

const { t } = useI18n()
const keyWord = $ref('')
const search = () => {
  if (keyWord)
    console.log("检索");
}
const store = useSvgenerateStore()
const handleClick = (svgObj:any) => {
  let obj = {
    name:svgObj.name,
    body:svgObj.body,
    property:{
      stokeColor:'',
      stokeWidth:0,
      fillColor:''
    }
  }
  store.setCurrentSvg(obj)
}
onMounted(()=>{
  fetchData()
})
const iconList = ref()
const fetchData = () => {
  axios.get('http://localhost:3200/form/fetchSvgFromIconify').then((res:any) => {
    let { icons } = res.data
    let keysArr = Object.keys(icons)
    let result = keysArr.map((i:string) => {
      return {
        name:i,
        body:icons[i].body
      }
    })
    iconList.value = result.slice(0,10)
    console.log(result);
  })
}

</script>
