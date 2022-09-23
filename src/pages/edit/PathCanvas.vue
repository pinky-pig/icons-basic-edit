<script setup lang="ts">
import { initCanvas,initSvgPath,initEventListener,initHistory,initRedoUndo } from './PathCanvas.module'
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

let { redo, undo } = initRedoUndo (props)

</script>

<template>
<div ref="canvas" id="canvas" class="w-full h-full min-w-10 overflow-hidden relative">
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
    :isPlay="store.isPlay"
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

  <div
    class=" absolute top-20px right-20px w-130px h-35px rounded-md grid grid-cols-2 bg-[var(--tool-button-color)]">
    <div class="flex-center rounded-l-md cursor-pointer hover:bg-[var(--tool-hover-color)] hover-zoom-in transition duration-500 ease-in-out hover:scale-110"
      @click="undo">
      <svg width="28" height="28" viewBox="0 0 256 256">
        <path fill="currentColor"
          d="M232 200a8 8 0 0 1-16 0a88.1 88.1 0 0 0-88-88H88v40a8 8 0 0 1-4.9 7.4a8.5 8.5 0 0 1-3.1.6a8.3 8.3 0 0 1-5.7-2.3l-48-48a8.1 8.1 0 0 1 0-11.4l48-48a8.4 8.4 0 0 1 8.8-1.7A8 8 0 0 1 88 56v40h40a104.2 104.2 0 0 1 104 104Z" />
      </svg>
    </div>
    <div class="flex-center rounded-r-md cursor-pointer hover:bg-[var(--tool-hover-color)] hover-zoom-in transition duration-500 ease-in-out hover:scale-110"
      @click="redo">
      <svg width="28" height="28" viewBox="0 0 256 256">
        <path fill="currentColor"
          d="m232.5 112.5l-48 48a12.1 12.1 0 0 1-17 0a12 12 0 0 1 0-17L195 116h-67a84.1 84.1 0 0 0-84 84a12 12 0 0 1-24 0A108.1 108.1 0 0 1 128 92h67l-27.5-27.5a12 12 0 0 1 17-17l48 48a12 12 0 0 1 0 17Z" />
      </svg>
    </div>
  </div>
</div>




</template>
