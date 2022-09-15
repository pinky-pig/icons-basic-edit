<template>
  <div class="flex flex-col ">
    <!-- top -->
    <div class="top w-full h-14 flex flex-row items-center">

      <!-- 播放按钮 -->
      <div class="text-[var(--animate-text-color)] mx-auto">
        <button class="animate-btn rounded-full">
          <div @click="startPlay" v-if="!store.isPlay" class=" w-8 h-8 cursor-pointer " i="carbon-play-outline" />
          <div @click="pausePlay" v-else class=" w-8 h-8 cursor-pointer " i="carbon-pause-outline" />
        </button>
      </div>


    </div>
    <!-- timeline -->
    <div>

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
</script>
<style scoped>
.top{
  box-shadow: 0 2px 15px 4px var(--box-shadow-color);
}
</style>
