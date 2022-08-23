
<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
console.log(x,y);
</script>

<template>
  <div ref="el" :style="style" class=" select-none cursor-move" style="position: fixed">
    <div class="w-[24.5rem] divide-y divide-slate-400/20 overflow-hidden rounded-lg bg-white text-[1.25rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
      <div class="flex items-center p-4 ">
        Command
      </div>
      <slot></slot>
    </div>


  </div>
</template>
