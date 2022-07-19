<template>
  <div class=" w-full h-full flex flex-col justify-center items-center dark:bg-[#222]">
    <div>
      <svg width="30" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g v-html="store.svgObj.body"></g>
      </svg>
    </div>

    <!-- <div>
      SVGenerate
    </div> -->
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
