<template>
  <div class=" w-90px h-50px bg-[#1c1c1e] rounded-md" v-for=" in props">

  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  list:{
    type:Array,
    default:[]
  }
})
</script>
<style lang="less" scoped>

</style>
