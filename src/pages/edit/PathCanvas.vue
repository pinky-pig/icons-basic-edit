<script setup lang="ts">
import { initCanvas,initSvgPath,initEventListener,initHistory } from './PathCanvas.module'
import PathCanvasContextMenu from "./PathCanvasContextMenu.vue";

const props = useSvgPathStore()
// 初始化画布
initCanvas(props)
// 初始化 svg 路径
initSvgPath(props)
// 监听拖拽
initEventListener(props)
// 监听编辑操作历史
initHistory(props)

// 监听画布面板尺寸
const canvas = ref(null)
const { width, height } = useElementBounding(canvas)
watch([width, height], () => {
  props.canvasWidth = width.value
  props.canvasHeight = height.value
})


/** 鼠标hover上才能打开 右键菜单 */
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  showDropdownRef.value = false

  if (props.hoveredItem) {
    nextTick().then(() => {
      showDropdownRef.value = true
      xRef.value = e.clientX
      yRef.value = e.clientY

      // 将hoverItem赋值给focusItem
      props.focusedItem = props.hoveredItem
    })
  }
}


const store = useSvgAnimate()


</script>

<template>
<div ref="canvas" id="canvas" class="w-full h-full min-w-10 overflow-hidden">
  <Canvas
    @contextmenu="handleContextMenu"
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
    :stepsData="store.stepsData"
    v-model:draggedPoint="props.draggedPoint"
    v-model:focusedItem="props.focusedItem"
    v-model:hoveredItem="props.hoveredItem"
    ></Canvas>

  <PathCanvasContextMenu
    :x="xRef"
    :y="yRef"
    v-model:showDropdownRef="showDropdownRef"
    ></PathCanvasContextMenu>
</div>




</template>
