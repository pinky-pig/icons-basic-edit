
<script setup lang="ts">

</script>

<template>
  <div  class=" select-none " style="position: fixed">
    <div class="w-[24.5rem] divide-y divide-slate-400/20 overflow-hidden rounded-lg bg-white text-[1.25rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
      <div class="flex items-center p-4 ">
        Path
      </div>

      <div class="flex items-center p-4 bg-[#99999990]]">
        <slot></slot>
      </div>

    </div>


  </div>
</template>
