<script setup lang="ts">
import { canvasProps } from './props'
import { initCanvas,initSvgPath,initEventListener } from './PathCanvas.module'

// 初始化变量
const props = reactive(canvasProps())
// 初始化画布
initCanvas(props)
// 初始化 svg 路径
initSvgPath(props)
// 监听拖拽
initEventListener(props)

// 监听画布面板尺寸
const canvas = ref(null)
const { width, height } = useElementBounding(canvas)
watch([width, height], () => {
  props.canvasWidth = width.value
  props.canvasHeight = height.value
})



</script>

<template>
<div ref="canvas" id="canvas" class="w-full h-full min-w-10 overflow-hidden">
  <Canvas
    :viewPortWidth="props.cfg.viewPortWidth"
    :viewPortHeight="props.cfg.viewPortHeight"
    :viewPortX="props.cfg.viewPortX"
    :viewPortY="props.cfg.viewPortY"
    :strokeWidth="props.strokeWidth"
    :canvasWidth="props.canvasWidth"
    :canvasHeight="props.canvasHeight"
    :parsedPath="props.parsedPath"

    :targetPoints="props.targetPoints"
    :controlPoints="props.controlPoints"
    v-model:draggedPoint="props.draggedPoint"
    v-model:focusedItem="props.focusedItem"
    v-model:hoveredItem="props.hoveredItem"
    ></Canvas>
</div>
</template>
