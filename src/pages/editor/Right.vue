
<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col fixed right-28px top-120px w-[350px] min-w-[264px] h-[75vh] rounded-2xl">
    <!-- <div class="absolute w-20 h-1 top-2 rounded-md  bg-[var(--panel-header-color)] z-10" style="left: calc(50% - 2.5rem);"></div> -->

    <div class="shadow-xl flex flex-col rounded-2xl overflow-hidden w-full h-full max-h-[60vh] bg-[var(--panel-bg-color)] text-[var(--panel-text-color)]">
      <div class=" px-3 py-2 border-b border-slate-400/20 w-full text-base leading-8 flex items-center z-0 ">
        Propertys
      </div>

      <div class="flex-1 w-full overflow-auto">
        <slot name="path"></slot>
        <slot name="command"></slot>
      </div>
    </div>

    <div class="shadow-xl w-full h-[80px] mt-6 p-3 rounded-2xl bg-[var(--panel-bg-color)] text-[var(--panel-text-color)]">
      <div class="w-full h-full rounded-xl overflow-y-hidden">
        <slot name="button"></slot>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
