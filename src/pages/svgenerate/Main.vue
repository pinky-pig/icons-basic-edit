<template>
  <div class=" py-4 w-full h-full flex flex-col justify-between items-center dark:bg-[#222]">
    <!-- name -->
    <div> {{store.svgObj.name}} </div>

    <div>
      <svg width="150" height="150" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(5)" v-html="store.svgObj.body"></g>
      </svg>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
const store = useSvgenerateStore()

watch(
  () => store.svgObj,
  (v1,v2)=>{
    // console.log(v1);
  },
  {deep:true}
)
</script>
