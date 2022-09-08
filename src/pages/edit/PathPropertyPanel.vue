
<script setup lang="ts">
import { initMatrix } from './PathPropertyPanel.module';
const props = useSvgPathStore()


let { translate , scale } =  initMatrix(props)


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
        Morph
      </div>

      <div class="h-34px overflow-auto cursor-default px-3 mx-2 flex flex-row justify-center items-center gap-2">
        <div class="text-lg flex justify-center items-center rounded-lg w-1/3 h-full bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <n-button @click="scale(props.scaleX,props.scaleY)" class="w-full text-lg p-0">Scale</n-button>
        </div>
        <div style="border-radius: 10px;" class=" x-input w-1/3 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <input
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0 focus:ring-0 bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
            v-model="props.scaleX"
            />
        </div>
        <div style="border-radius: 10px;" class=" y-input w-1/3 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <input
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0 focus:ring-0 bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
            :value="props.scaleY"
            />
        </div>
      </div>

      <div class="h-34px overflow-auto cursor-default px-3 mx-2 flex flex-row justify-center items-center gap-2">
        <div class="text-lg flex justify-center items-center rounded-lg w-1/3 h-full bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <n-button @click="translate(props.translateX,props.translateY)" class="w-full text-lg p-0">Translate</n-button>
        </div>

        <div style="border-radius: 10px;" class=" x-input w-1/3 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <input
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0 focus:ring-0 bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
            v-model="props.translateX"
            />
        </div>
        <div style="border-radius: 10px;" class=" y-input w-1/3 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <input
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0 focus:ring-0 bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
            :value="props.translateY"
            />
        </div>
      </div>
<ContextMenu></ContextMenu>
    </div>

  </div>
</template>
<style>
.x-input::before{
  content: 'x';
  color: var(--input-text-color);
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  margin-left: -20px;
  text-align: right;
  position: absolute;
}
.y-input::before{
  content: 'y';
  color: var(--input-text-color);
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  margin-left: -20px;
  text-align: right;
  position: absolute;
}
</style>
