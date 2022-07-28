<script setup lang="ts">

let url = 'https://img1.baidu.com/it/u=1966616150,2146512490&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659114000&t=08e0d8330904b0bbf831140c1978d4cd'
let allItems = Array.from(Array(100).keys(), (item,index)=>{return {url,idx:item}});
const { list, containerProps, wrapperProps } = useVirtualList(
  allItems,
  {
    itemHeight: 22,
  },
)



// const iconList = ref()
// const fetchData = () => {
//   axios.get('http://localhost:3200/form/fetchSvgFromIconify').then((res:any) => {
//     let { icons,height,width } = res.data
//     viewBox.value = `0 0 ${width} ${height}`

//     let keysArr = Object.keys(icons)
//     let result = keysArr.map((i:string) => {
//       return {
//         name:i,
//         width,
//         height,
//         body:icons[i].body
//       }
//     })
//     iconList.value = result.slice(0,10)
//     // console.log(result);
//   })
// }




</script>

<template>
  <div>

    <div v-bind="containerProps" style="height:300px" class="overflow-auto p-2 bg-gray-500/5 rounded">
      <div v-bind="wrapperProps">
        <div
          v-for="{ index, data } in list"
          :key="index"
          class="border border-$c-divider mb-2"
          :style="{
            height: `${42}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }"
        >
          <img class=" w-20px h-30px" :src="data.url" alt="">
          Row {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>
