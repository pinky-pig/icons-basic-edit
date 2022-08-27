
<script setup lang="ts">

</script>

<template>
  <div class=" w-[24.5rem] divide-y shadow-xl select-none right-30px top-120px h-[85vh]  leading-5 rounded-2xl overflow-auto text-[1.25rem]
              bg-[var(--second-bg-color)] text-[var(--primary-text-color)] divide-slate-400/20  shadow-black/5 ring-1 ring-slate-700/10 fixed ">
    <div class="absolute w-20 h-1 top-2 rounded-md  bg-[var(--toolBar-header-color)]" style="left: calc(50% - 2.5rem);"></div>
    <div class="flex items-center p-4 text-3xl">
      Tools
    </div>

    <div class="flex items-center flex-col gap-4 py-4 divide-y divide-slate-400/20">
      <slot name="path"></slot>
      <slot name="command"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
