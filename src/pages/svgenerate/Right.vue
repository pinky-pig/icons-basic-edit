<template>
  <div class=" flex flex-col w-full h-full bg-[#F5F6F6] dark:bg-[#222] ">
    <ContainerComponent class=" w-150px h-200px mx-auto my-4 "></ContainerComponent>
    <div class=" flex-1 flex flex-col p-5 border-t">

      <div class=" mb-44px" v-for="item in propertyList">
        <div class="flex flex-row justify-between mb-16px text-24px">
          <div>{{item.label}}</div>
          <div>{{item.value}}</div>
        </div>
        <Slide v-model="item.value"></Slide>
      </div>

      <div class=" flex flex-row " >
        <div @click="animate" class=" bg-[rgba(50,138,255,.1)] inline-block font-bold py-2 px-4 rounded-md mb-4 text-sm cursor-pointer " > 
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
      item.setAttribute('fill','transparent')
    }
    item.setAttribute('class','path-animate')
    
  }
  
  let tl = gsap.timeline({ repeat: 0, yoyo: true,onComplete: onCompleteHandler })
  tl.fromTo(
      '.path-animate',
      { drawSVG: "0%" },
      { duration: 2, drawSVG: "100%", stagger: 0.1 },
    )

  function onCompleteHandler(e:any){
    for (const item of pathArr) {
      if (item.attributes.fill.value != 'none') {
        item.setAttribute('fill','currentColor')
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
    label:'Size',
    value:store.svgObj.property.size
  },
  {
    label:'Stroke',
    value:store.svgObj.property.stokeWidth
  },
])

</script>
