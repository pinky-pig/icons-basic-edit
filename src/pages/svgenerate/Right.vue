<template>
  <div class=" flex flex-col w-full h-full bg-[#F5F6F6] dark:bg-[#222] ">
    <ContainerComponent class=" w-150px h-200px mx-auto my-4 "></ContainerComponent>
    <div class=" flex-1 flex flex-col p-5 border-t border-gray-300 select-none">

      <div class=" mb-44px" v-for="item in propertyList">
        <div class="flex flex-row justify-between mb-16px text-1.25rem">
          <div>{{ item.label }}</div>
          <div>{{ item.value }}</div>
        </div>
        <Slide v-model="item.value" :min="item.min" :max="item.max"></Slide>
      </div>


      <div class=" mb-44px">
        <div class="flex flex-row mb-16px text-1.25rem">
          <div>Color</div>
        </div>
        <div class="flex flex-row mb-16px text-1.25rem" v-for="item in 2">
          <input v-for="it in 5" class="border-0 outline-none w-40px h-30px" type="color" :value="isDark ? '#e5e7eb' : '#374151'" />
        </div>

      </div>

      <div class=" flex flex-row ">
        <div @click="animate"
          class=" bg-[rgba(50,138,255,.1)] inline-block font-bold py-2 px-4 rounded-md mb-4 text-sm cursor-pointer ">
          Stroke Animate
        </div>
      </div>


    </div>


    <SvgCode class=" w-full h-60 flex flex-col justify-end items-end"></SvgCode>

  </div>
</template>
<script setup lang="ts">
import { ContainerComponent } from '~/components/StarportSvg'
import SvgCode from './SvgCode.md'

// 用法见./vue3Gsap。md
const gsap = window.gsap
const DrawSVGPlugin = window.DrawSVGPlugin
gsap.registerPlugin(DrawSVGPlugin);

const animate = () => {
  let pathArr = document.querySelector('#wholeSvg')?.childNodes[0].childNodes as any
  for (const item of pathArr) {
    if (item.attributes.fill.value != 'none') {
      item.setAttribute('fill', 'transparent')
    }
    item.setAttribute('class', 'path-animate')

  }

  let tl = gsap.timeline({ repeat: 0, yoyo: true, onComplete: onCompleteHandler })
  tl.fromTo(
    '.path-animate',
    { drawSVG: "0%" },
    { duration: 2, drawSVG: "100%", stagger: 0.1 },
  )

  function onCompleteHandler(e: any) {
    for (const item of pathArr) {
      if (item.attributes.fill.value != 'none') {
        item.setAttribute('fill', 'currentColor')
      }
    }
  }

}


/**
 * 1.size => scale
 * 2.stroke-width
 * 3.stroke-color
 * 4.fill-color
 */
const store = useSvgenerateStore()

const propertyList = ref([
  {
    label: 'Size',
    value: 192,
    min: 96,
    max: 675,
  },
  {
    label: 'Stroke',
    value: 1,
    min: 0.5,
    max: 3.5
  },
])

watch(() => propertyList.value[0].value, (v1) => {
  store.svgObj.size = Number(v1)
})
watch(() => propertyList.value[1].value, (v1) => {
  store.svgObj.stokeWidth = Number(v1)
})



</script>
