
<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
console.log(x,y);
</script>

<template>
  <div ref="el" :style="style" class=" select-none cursor-move" style="position: fixed">
    <div class="w-[24.5rem] divide-y divide-slate-400/20 overflow-hidden rounded-lg bg-white text-[1.25rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
      <div class="flex items-center p-4 ">
      </div>

      <Collapse class="bg-[#F2F2F2]" :title="'Command'">
        <div class=" flex flex-row gap-2 mb-2" >
          <div class=" max-w-4 w-4 bg-orange-300">M</div>
          <div class="flex flex-row " >
            4 8 9
          </div>
        </div>
      </Collapse>


    </div>


  </div>
</template>
