<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { initCanvasSize, main } from '~/controls/Main'

const props = useSvgPathStore()

main()

// 监听画布面板尺寸
const { canvasRef } = storeToRefs(props)
onMounted(() => {
  initCanvasSize(props)
})

/** 鼠标hover上才能打开 右键菜单 */
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
function handleContextMenu(e: MouseEvent) {
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
</script>

<template>
  <div id="canvas" ref="canvasRef" class="w-full h-full min-w-10 overflow-hidden relative">
    <Canvas
      v-model:draggedPoint="props.draggedPoint"
      v-model:focusedItem="props.focusedItem"
      v-model:hoveredItem="props.hoveredItem"
      :view-port-width="props.cfg.viewPortWidth"
      :view-port-height="props.cfg.viewPortHeight"
      :view-port-x="props.cfg.viewPortX"
      :view-port-y="props.cfg.viewPortY"
      :stroke-width="props.strokeWidth"
      :canvas-width="props.canvasWidth"

      :canvas-height="props.canvasHeight"
      :parsed-path="props.parsedPath"
      :target-points="props.targetPoints"
      :control-points="props.controlPoints"
      @contextmenu="handleContextMenu"
    />

    <ContextMenu
      v-model:showDropdownRef="showDropdownRef"
      :x="xRef"
      :y="yRef"
    />

    <ToolBar />
  </div>
</template>
