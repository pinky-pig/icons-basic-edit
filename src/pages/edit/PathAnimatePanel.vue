<template>
  <div class="flex flex-col w-full h-full">
    <!-- top -->
    <div class="top w-full h-14 flex flex-row items-center justify-between px-4">

      <!-- 播放按钮 -->
      <div class="text-[var(--animate-text-color)] flex flex-row gap-4">
        <button class="rounded-full">
          <div @click="startPlay" v-if="!store.isPlay" class=" w-8 h-8 cursor-pointer bg-green-400 animate-btn" i="carbon-play-outline" />
          <div @click="pausePlay" v-else class=" w-8 h-8 cursor-pointer bg-[#FDD352] animate-btn" i="carbon-pause-outline" />
        </button>

        <button :disabled="!store.isPlay" class="animate-btn rounded-full">
          <div @click="stopPlay" :class="!store.isPlay ? 'bg-[#E4E5EE30]' : 'bg-[#FF6168]'"  class=" w-8 h-8 cursor-pointer" i="carbon-stop-outline" />
        </button>
      </div>

      <!-- 操作按钮 -->

      <div class="mr-10 text-[var(--animate-text-color)] flex flex-row gap-4">
        <button class="rounded-full">
          <div class=" w-6 h-6 cursor-pointer bg-[#E4E5EE] animate-btn" i="carbon-trash-can" />
        </button>
      </div>


    </div>
    <!-- timeline -->
    <div class="w-full flex-1 px-4 min-h-100px">

      <div class="relative w-full h-full flex flex-row justify-center items-center  ">

        <div class="absolute w-full top-0 left-0 flex flex-row justify-between" >
          <div class="tick" v-for="i in 21" :key="i"><b>{{(i*5) - 5}}%</b></div>
        </div>

        <div class="timelineBody w-full h-70% rounded-xl border" >

        </div>
      </div>


    </div>
  </div>
</template>
<script setup lang="ts">
const store = useSvgAnimate()

const startPlay = () => {
  store.isPlay = true
}
const pausePlay = () => {
  store.isPlay = false
}
const stopPlay = () => {
  if (store.isPlay) {
    // 正在播放
    store.isPlay = false
  }
}
</script>
<style scoped>
.top{
  box-shadow: 0 2px 15px 4px var(--box-shadow-color);
}

</style>
