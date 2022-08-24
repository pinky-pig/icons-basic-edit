
<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 200 },
})
console.log(x,y);
</script>

<template>
  <div ref="el" :style="style" class=" select-none cursor-move" style="position: fixed">
    <div class="w-[24.5rem] divide-y divide-slate-400/20 overflow-hidden rounded-lg bg-[#2e2e30] text-[1.25rem] leading-5 text-[#e6e6e6] shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
      <div class="flex items-center p-4 ">
        Command
      </div>
      <div class="bg-[#1c1c1e]">
        <slot ></slot>
      </div>
    </div>


  </div>
</template>
