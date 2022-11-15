<script setup lang="ts">
import type { MaybeElementRef } from '@vueuse/core'
import { UseSvgBorder } from './Svg'

import { ProxyComponent } from '~/components/StarportSvg'

const store = useSvgenerateStore()
const storeSvg = useSvgStore()

/** icon 的尺寸 */
const viewBox = computed(() => {
  return `0 0 ${store.svgObj.width} ${store.svgObj.height}`
})

/** 监听当前 svg 是否改变，若改变，清空选择边控 */
watch(() => store.svgObj.name, () => {
  svgBorderPath.value = ''
})

/**
 * box 在这个 dom 上监听点击
 * svgBorderPath 点击后显示边框
 */
const box = ref(null)
const svgBorderPath = ref()
const mouseInElement = (target?: MaybeElementRef) => {
  const targetRef = ref(target ?? window?.document.body)
  const el = unrefElement(targetRef)
  el?.addEventListener('mousedown', (e: any) => {
    if (e.target.id === 'wholeSvg')
      return
    svgBorderPath.value = e.target.outerHTML
    storeSvg.selectedSvgDom = e.target
  })

  onClickOutside(el, () => svgBorderPath.value = '')
}

onMounted(() => {
  mouseInElement(box)
})

// 控制画布的尺寸
const wrapperSize = ref(1)
// 画布放大scale
const wrapperScale = computed(() => {
  return (storeSvg.size / 192).toFixed(1)
})
const wrapperStrokeWidth = computed(() => {
  return storeSvg.stokeWidth
})
const wrapperStrokeColor = computed(() => {
  return storeSvg.stokeColor
})
</script>

<template>
  <div class="py-4 w-full h-full flex flex-col justify-between items-center dark:bg-[#222]">
    <!-- name -->
    <div class=" text-3xl text-[#374151] dark:text-[#e5e7eb]">
&nbsp; {{ store.svgObj.name }}&nbsp;
    </div>

    <div class="relative" :style="{ fontSize: storeSvg.size }" style="font-size:192px">
      <svg :style="{ width: `calc(192px * ${wrapperSize})`, height: `calc(192px * ${wrapperSize})`, transform: `scale(${wrapperScale})` }">
        <UseSvgBorder id="shadowSvg" :path="svgBorderPath" :viewBox="viewBox" />
        <svg
          id="wholeSvg" ref="box" :style="{ strokeWidth: `${wrapperStrokeWidth}`, color: `${wrapperStrokeColor}` }" class="absolute" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em"
          preserveAspectRatio="xMidYMid meet" :viewBox="viewBox"
        >
          <g fill="none" stroke="currentColor" v-html="store.svgObj.body" />
        </svg>
      </svg>
    </div>

    <!-- 控制画布大小 -->
    <!-- <input type="range" min="1" max="3" v-model="wrapperSize" /> -->

    <Footer />

    <ProxyComponent />
  </div>
</template>

