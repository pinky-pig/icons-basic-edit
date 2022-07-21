<template>
  <svg
    ref="box"
    style="font-size:150px"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    :viewBox = "'0 0 32 32'"
    >
    <g fill="none" stroke="currentColor" v-html="storeSvg.selectedSvgDom ? (storeSvg.selectedSvgDom as any).outerHTML : ''" >
    </g>
  </svg>
</template>
<script setup lang="ts">
const storeSvg = useSvgStore()

</script>
