
<script setup lang="ts">
import { initMatrix,initScreenshot } from './PathPropertyPanel.module';
const props = useSvgPathStore()

initMatrix(props)

const transformType = reactive([
  { label:'Scale', value:[
    computed({ set(v){ props.scaleX = Number(v)}, get(){ return props.scaleX } }),
    computed({ set(v){ props.scaleY = Number(v)}, get(){ return props.scaleY } })
  ]},
  { label:'Translate', value:[
    computed({ set(v){ props.scaleX = Number(v) }, get(){ return props.translateX } }),
    computed({ set(v){ props.scaleX = Number(v) }, get(){ return props.translateY } }),
  ]},
])

const galleryList = computed(() => props.gallery)

const handleDragStart = (e) => {
  console.log(e)
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- All path data -->
    <div class=" flex flex-col items-start p-5">
      <div class=" text-xl  tracking-widest"> 属性 </div>
    </div>

    <!-- command -->
    <div class=" flex flex-col h-130px overflow-auto gap-3">
      <div class=" flex flex-row tracking-widest px-5 ">
        Transform
      </div>

      <div v-for="(item, index) in transformType" :key="index" class="h-34px overflow-auto cursor-default px-3 mx-2 flex flex-row items-center gap-2">
        <div class="text-lg flex justify-center items-center rounded-lg w-1/3 h-full bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          {{item.label}}
        </div>

        <div v-for="it,idx in item.value" style="border-radius: 10px;" class=" relative flex-1 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <div class="input-label">{{ item.value.length === 1 ? ' ' : ( idx === 0 ? 'x' : 'y') }}</div>
          <input
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0  bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
            v-model="transformType[index]['value'][idx].value"
            />
        </div>
      </div>

    </div>

    <!-- gallery -->
    <div class="w-full flex flex-col gap-3 px-5">

      <button class="w-8 h-8" @click="initScreenshot(props)">
        <div class="w-8 h-8" i-carbon-screen> </div>
      </button>

      <div class="w-full gap-3 grid grid-cols-4">
        <div @dragstart="handleDragStart" class=" w-60px h-60px rounded-md bg-[var(--input-bg-color)] text-[var(--input-text-color)]" v-for="item in galleryList">
          <svg draggable class=" w-full h-full" stroke="currentColor" fill="currentColor">
            <path :d="item.path"></path>
          </svg>
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
