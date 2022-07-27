<template>
  <div class=" flex flex-col w-full h-full bg-[#F5F6F6] dark:bg-[#222] ">
    <ContainerComponent class=" w-150px h-150px mx-auto my-4"></ContainerComponent>
    <div class=" flex-1  "></div>

    <SvgCode class=" w-full h-60 flex flex-col justify-end items-end"></SvgCode>

  </div>
</template>
<script setup lang="ts">
import { ContainerComponent } from '~/components/StarportSvg'
import SvgCode from './SvgCode.md'

</script>
