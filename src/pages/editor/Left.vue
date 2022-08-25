
<script setup lang="ts">

</script>

<template>
  <div class="w-[24.5rem] divide-y divide-slate-400/20 select-none left-30px top-120px h-[85vh] bg-[#1c1c1e] leading-5 rounded-2xl overflow-auto text-[1.25rem] text-[#e6e6e6] shadow-xl shadow-black/5 ring-1 ring-slate-700/10 " style="position: fixed">
    <div class="flex items-center p-4 text-3xl">
      Path
    </div>

    <div class="flex items-center p-4 text-[#fff]">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
