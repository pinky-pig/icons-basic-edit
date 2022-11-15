<script setup lang="ts">
import SvgCode from './SvgCode.md'
import { ContainerComponent } from '~/components/StarportSvg'
import { symbolFn } from '~/utils/common'

// 用法见./vue3Gsap。md
const gsap = window.gsap
const DrawSVGPlugin = window.DrawSVGPlugin
gsap.registerPlugin(DrawSVGPlugin)

const animate = () => {
  const pathArr = document.querySelector('#wholeSvg')?.childNodes[0].childNodes as any
  for (const item of pathArr) {
    if (item.attributes.fill.value !== 'none')
      item.setAttribute('fill', 'transparent')

    item.setAttribute('class', 'path-animate')
  }

  const tl = gsap.timeline({ repeat: 0, yoyo: true, onComplete: onCompleteHandler })
  tl.fromTo(
    '.path-animate',
    { drawSVG: '0%' },
    { duration: 2, drawSVG: '100%', stagger: 0.1 },
  )

  function onCompleteHandler(e: any) {
    for (const item of pathArr) {
      if (item.attributes.fill.value !== 'none')
        item.setAttribute('fill', 'currentColor')
    }
  }
}

/**
 * 1.size => scale
 * 2.stroke-width
 * 3.stroke-color
 * 4.fill-color
 */
const storeSvg = useSvgStore()

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
    max: 3.5,
  },
])

watch(() => propertyList.value[0].value, (v1) => {
  storeSvg.size = Number(v1)
})
watch(() => propertyList.value[1].value, (v1) => {
  storeSvg.stokeWidth = Number(v1)
})

const inputColor = ref(isDark.value ? '#e5e7eb' : '#374151')
watch(() => inputColor.value, (v1) => {
  storeSvg.stokeColor = v1
})
</script>

<template>
  <div class=" flex flex-col w-full h-full bg-[#F5F6F6] dark:bg-[#222] overflow-hidden">
    <ContainerComponent class=" w-150px h-200px min-h-200px mx-auto my-4 " />
    <div class=" flex-1 flex flex-col p-5 border-t border-gray-300 select-none">
      <div v-for="item in propertyList" :key="symbolFn(item)" class=" mb-44px">
        <div class="flex flex-row justify-between mb-16px text-1.25rem">
          <div>{{ item.label }}</div>
          <div>{{ item.value }} px</div>
        </div>
        <Slide v-model="item.value" :min="item.min" :max="item.max" />
      </div>

      <div class=" mb-44px">
        <div class="flex flex-row mb-16px text-1.25rem">
          <div>Color</div>
        </div>
        <div class="flex flex-row mb-16px text-1.25rem">
          <input v-model="inputColor" class="border-0 outline-none w-40px h-30px cursor-pointer" type="color">
        </div>
      </div>

      <div class=" flex flex-row ">
        <div
          class=" bg-[rgba(50,138,255,.1)] inline-block font-bold py-2 px-4 rounded-md mb-4 text-sm cursor-pointer "
          @click="animate"
        >
          Stroke Animate
        </div>
      </div>
    </div>

    <SvgCode class=" w-full h-60 flex flex-col justify-end items-end" />
  </div>
</template>
