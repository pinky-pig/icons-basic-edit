<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div v-for="i, idx in props" :key="idx" class=" w-90px h-50px bg-[#1c1c1e] rounded-md" />
</template>

<style lang="less" scoped>

</style>
