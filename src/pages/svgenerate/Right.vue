<template>
  <div class=" flex flex-col w-full h-full bg-[#F5F6F6] dark:bg-[#222] ">
    <ContainerComponent class=" w-150px h-200px mx-auto my-4"></ContainerComponent>
    <div class=" flex-1 flex flex-col p-5">

      <div class=" flex flex-row " >
        <div  @click="animate"
          class="
            bg-[rgba(50,138,255,.1)] 
            inline-block 
            font-bold 
            py-2 px-4 
            rounded-md 
            mb-4 
            text-sm 
            cursor-pointer
            "
            > Stroke Animate
          </div>

      </div>
      <svg width="100" class="svg-container" height="500" fill="none">
        <path class="path" stroke="white" d="M 40 50 L 0 50 L 50 0 L 100 50 L 60 50 L 60 400 L 40 400 z"></path>
      </svg>

    </div>

    <SvgCode class=" w-full h-60 flex flex-col justify-end items-end"></SvgCode>

  </div>
</template>
<script setup lang="ts">
import { ContainerComponent } from '~/components/StarportSvg'
import SvgCode from './SvgCode.md'

const storeSvg = useSvgStore()

// 第二行：.to()方法，gsap核心方法，类似于css动画中的to，简单来说就是根据后面设置的参数，确定元素最终显示什么效果。第一个参数是绑定需要动画的元素，可以是类名或者id。此处为类名为‘star’的星星图案。

// 第三行：duration参数，设置动画时间

// 第四行：scale参数，可以设置元素最终放大到多少倍。random是一个随机函数，达到的效果就是不同的元素，动画最终的效果会形成不同大小的星星。

// 第五行：repeat参数，设置动画重复的次数，-1表示无限重复。

// 第六行：yoyo参数，悠悠参数，开启后会自动形成一个往复的动画，有利于动画衔接。

// 第七行：opacity参数，设置元素最终的透明度。

const animate = () => {
  console.log(storeSvg.selectedSvgDom);
  
  gsap.registerPlugin(DrawSVGPlugin);
  let tl = gsap.timeline({ repeat: -1, yoyo: true })
  tl
    .fromTo(
      '.path',
      { drawSVG: "0%" },
      { duration: 5, drawSVG: "100%", stagger: 0.1 },
    )
}





</script>
