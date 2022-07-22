<template>
  <div class=" py-4 w-full h-full flex flex-col justify-between items-center dark:bg-[#222]">
    <!-- name -->
    <div class=" text-3xl text-[#374151] dark:text-[#e5e7eb]"> {{store.svgObj.name}} </div>

    <div class="relative w-[192px] h-[192px]" style="font-size:192px">
      <UseSvgBorder :path="svgBorderPath" :viewBox="viewBox"></UseSvgBorder>
      <svg
        id="wholeSvg"
        class="absolute"
        ref="box"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        :viewBox=viewBox
        >
        <g fill="none" stroke="currentColor" v-html="store.svgObj.body" >
        </g>
      </svg>

    </div>
    <Footer></Footer>

    <ProxyComponent></ProxyComponent>

  </div>
</template>
<script setup lang="ts">
import { MaybeElementRef } from '@vueuse/core';
import { UseSvgBorder } from './Svg'

import { ProxyComponent } from '~/components/StarportSvg'


const store = useSvgenerateStore()
const storeSvg = useSvgStore()

/** icon 的尺寸 */
const viewBox = computed(() => {
  return `0 0 ${store.svgObj.width} ${store.svgObj.height}`
})

/** 监听当前 svg 是否改变，若改变，清空选择边控 */
watch(() => store.svgObj.name,() => {
  svgBorderPath.value = ''
})

/**
 * box 在这个 dom 上监听点击
 * svgBorderPath 点击后显示边框
 */
const box = ref(null)
const svgBorderPath = ref()
const mouseInElement = (target?:MaybeElementRef) => {
  const targetRef = ref(target ?? window?.document.body)
  const el = unrefElement(targetRef)
  el?.addEventListener('mousedown',(e:any) => {
    if (e.target.id === 'wholeSvg')
      return
    svgBorderPath.value = e.target.outerHTML
    storeSvg.selectedSvgDom = e.target
  })

  onClickOutside(el, (event) => svgBorderPath.value = '' )
}


onMounted(()=>{
  mouseInElement(box)
})
</script>
