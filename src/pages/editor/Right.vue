
<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col fixed right-30px top-120px w-[24.5rem] h-[75vh] rounded-2xl overflow-hidden ">
    <div class="absolute w-20 h-1 top-2 rounded-md  bg-[var(--property-header-color)] z-10" style="left: calc(50% - 2.5rem);"></div>
    <div class="border-b border-slate-400/20 w-full h-[80px] mt-1 p-4 text-3xl flex items-center rounded-t z-0 bg-[var(--property-bg-color)] text-[var(--property-text-color)] ">
      Propertys
    </div>

    <div class="flex-1 w-full py-4 overflow-auto rounded-b-2xl divide-y divide-slate-400/20 bg-[var(--property-bg-color)] text-[var(--property-text-color)] ">
      <slot name="path"></slot>
      <slot name="command"></slot>
    </div>

    <div class=" w-full h-[80px] mt-8 p-3 rounded-2xl bg-[var(--property-button-color)] text-[var(--property-text-color)]">
      <div class="w-full h-full rounded-xl overflow-y-hidden">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
