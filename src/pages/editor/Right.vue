
<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col fixed right-30px top-120px w-[24.5rem] h-[75vh] rounded-2xl overflow-hidden bg-[var(--second-bg-color)] text-[var(--primary-text-color)] ">
    <div class="absolute w-20 h-1 top-2 rounded-md  bg-[var(--toolBar-header-color)] z-10" style="left: calc(50% - 2.5rem);"></div>
    <div class="border-b border-slate-400/20 w-full h-[80px] mt-1 p-4 text-3xl flex items-center bg-[var(--second-bg-color)] text-[var(--primary-text-color)] rounded-t z-0">
      Tools
    </div>

    <div class="flex-1 w-full py-4 overflow-auto divide-y divide-slate-400/20">
      <slot name="path"></slot>
      <slot name="command"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
