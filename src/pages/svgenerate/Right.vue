<template>
  <div class=" w-full h-full bg-[#F5F6F6] dark:bg-[#222]">
    <ContainerComponent class=" w-150px mx-auto"></ContainerComponent>

    <code></code>
    <PreviewCode :code="name" :type="'html'" />

  </div>
</template>
<script setup lang="ts">
import { ContainerComponent } from '~/components/StarportSvg'
import code from './code.md'
import PreviewCode from './PreviewCode.vue'

  const storeSvg = useSvgStore()
  const name = ref('666')
  watch(() => storeSvg.selectedSvgDom, (v1:any, v2:any) => {
    if (v1?.outerHTML)
      name.value = v1.outerHTML
  })
</script>
