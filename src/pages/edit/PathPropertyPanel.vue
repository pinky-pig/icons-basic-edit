
<script setup lang="ts">
import { initMatrix } from './PathPropertyPanel.module';
const props = useSvgPathStore()

initMatrix(props)

const transformType = [
  { label:'Scale', value:[ props.scaleX, props.scaleY ] },
  { label:'Translate', value:[ props.translateX, props.translateY, ] },
  // { label:'Skew', value:[ {x:1}, {y:1}, ] },
  // { label:'Rotate', value:[ {'角度':1}, ] },
  // { label:'Transform-origin', value:[ {'center':1}, ] },
]

console.log(transformType);


</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- All path data -->
    <div class=" flex flex-col items-start p-5">
      <div class=" text-xl  tracking-widest"> 属性 </div>
    </div>

    <!-- command -->
    <div class=" flex flex-col flex-auto overflow-auto gap-3">
      <div class=" flex flex-row tracking-widest px-5 ">
        Transform
      </div>

      <div v-for="(item, index) in transformType" :key="index" class="h-34px overflow-auto cursor-default px-3 mx-2 flex flex-row justify-center items-center gap-2">
        <div class="text-lg flex justify-center items-center rounded-lg w-1/3 h-full bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          {{item.label}}
        </div>

        <div v-for="it,idx in item.value" :key="it" style="border-radius: 10px;" class=" relative w-1/3 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <div class="input-label">{{idx === 0 ? 'x' : 'y'}}</div>
          <input
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0 focus:ring-0 bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
            v-model="transformType[index]['value'][idx]"
            />
        </div>
      </div>

    </div>

  </div>
</template>
<style>
.input-label{
  color: var(--input-text-color);
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  position: absolute;
  left: 10px;
  top: 5px;
}
</style>
