<template>
  <div class=" w-full h-full  dark:bg-[#222]">

  </div>
</template>
<script setup lang="ts">
const store = useSvgenerateStore()
console.log(store.svgObj);
watch(
  () => store.svgObj,
  (v1,v2)=>{
    console.log(111);
    console.log(v1);
  },
  {deep:true}
)
</script>
