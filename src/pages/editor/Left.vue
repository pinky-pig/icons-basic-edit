
<script setup lang="ts">

</script>

<template>
  <div class="w-[24.5rem] divide-y shadow-xl select-none left-30px top-120px h-[85vh]  leading-5 rounded-2xl overflow-auto text-[1.25rem]
              bg-[var(--second-bg-color)] text-[var(--primary-text-color)] divide-slate-400/20  shadow-black/5 ring-1 ring-slate-700/10 fixed ">
    <div class="flex items-center p-4 text-3xl">
      Path
    </div>

    <div class="flex items-center p-4 ">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
