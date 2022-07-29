<script setup lang="ts">
import axios from 'axios';
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
    iconList.value = result.slice(0,100)
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

// let url = 'https://img1.baidu.com/it/u=1966616150,2146512490&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659114000&t=08e0d8330904b0bbf831140c1978d4cd'
// let allItems = Array.from(Array(100).keys(), (item,index)=>{return {url,idx:item}});
const { list, containerProps, wrapperProps } = useVirtualList(
  iconList,
  {
    itemHeight: 120,
  },
)


</script>

<template>
  <div>

    <div v-bind="containerProps" style="height:400px" class="overflow-auto p-2 bg-gray-500/5 rounded">
      <div v-bind="wrapperProps">
        <div
          v-for="{ index, data } in list"
          :key="index"
          class="border border-$c-divider mb-2"
          :style="{
            height: `${120}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }"
        >

          <div class=" w-30 h-30 text-center cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-[#282828]" v-for="i in data">
            <div style="font-size:30px" class=" w-[30px] h-[30px] mx-auto flex flex-row items-center justify-center mt-[25px] mb-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox='0 0 32 32'
                >
                <g v-html="i.body" > </g>
              </svg>
            </div>

            <div class="w-[90px] mx-auto" style="font-size: 0.25rem;">{{i.name}}</div>
          </div>



        </div>
      </div>
    </div>
  </div>
</template>
