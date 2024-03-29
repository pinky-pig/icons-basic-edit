<!-- eslint-disable no-useless-return -->
<script setup lang="ts">
import type { SvgControlPoint, SvgPoint } from '~/pages/edit/Svg'
import { stepsType } from '~/store/svg-animate'
import { symbolFn } from '~/utils/common'

const props = defineProps({
  viewPortX: {
    type: Number,
    default: 0,
  },
  viewPortY: {
    type: Number,
    default: 0,
  },
  viewPortWidth: {
    type: Number,
    default: 0,
  },
  viewPortHeight: {
    type: Number,
    default: 0,
  },
  strokeWidth: {
    type: Number,
    default: 1,
  },

  canvasWidth: {
    type: Number,
    default: 100,
  },
  canvasHeight: {
    type: Number,
    default: 100,
  },

  parsedPath: {
    default: '',
  },

  targetPoints: {
    type: Array<SvgPoint>,
    default: [],
  },

  controlPoints: {
    type: Array<SvgControlPoint>,
    default: [],
  },

  draggedPoint: {
    type: Object,
    default: null,
  },

  focusedItem: {
    type: Object,
    default: null,
  },

  hoveredItem: {
    type: Object,
    default: null,
  },

  stepsData: {
    type: Array,
    default: () => [],
  },
  isPlay: {
    type: String,
    default: 'stop',
  },

})

// 将 dragPoint 传给父组件
const emit = defineEmits(['update:draggedPoint', 'update:focusedItem', 'update:hoveredItem'])

const xGrid = ref()
const yGrid = ref()
watch(props, () => {
  if (5 * props.viewPortWidth <= props.canvasWidth) {
    xGrid.value = Array(Math.ceil(props.viewPortWidth) + 1).fill(null).map((_, i) => Math.floor(props.viewPortX) + i)
    yGrid.value = Array(Math.ceil(props.viewPortHeight) + 1).fill(null).map((_, i) => Math.floor(props.viewPortY) + i)
  }
  else {
    xGrid.value = []
    yGrid.value = []
  }
}, { immediate: true })

// svg 路径
const parsedPath = computed(() => {
  if (props.parsedPath)
    return (props.parsedPath as any).asString()
  else
    return
})

const startDrag = (item: SvgPoint, evt?: MouseEvent) => {
  // 鼠标左键
  if (evt?.buttons === 1) {
    emit('update:draggedPoint', item)
    emit('update:focusedItem', item.itemReference)
    stopHover()
  }
}
const startHover = (item: SvgPoint) => {
  if (!props.focusedItem)
    emit('update:hoveredItem', item.itemReference)
}
function stopHover() {
  emit('update:hoveredItem', null)
}

// svg 选中的高亮路径
const focusedItemPath = computed(() => {
  if (props.focusedItem !== null)
    return props.focusedItem?.asStandaloneString()
  else
    return
})

// svg hover 的高亮路径
const hoveredItemPath = computed(() => {
  if (props.hoveredItem !== null)
    return props.hoveredItem?.asStandaloneString()
  else
    return
})

// M = moveto(M X,Y) ：将画笔移动到指定的坐标位置
// L = lineto(L X,Y) ：画直线到指定的坐标位置
// H = horizontal lineto(H X)：画水平线到指定的X坐标位置
// V = vertical lineto(V Y)：画垂直线到指定的Y坐标位置
// C = curveto(C X1,Y1,X2,Y2,ENDX,ENDY)：三次贝赛曲线
// S = smooth curveto(S X2,Y2,ENDX,ENDY)
// Q = quadratic Belzier curve(Q X,Y,ENDX,ENDY)：二次贝赛曲线
// T = smooth quadratic Belzier curveto(T ENDX,ENDY)：映射
// A = elliptical Arc(A RX,RY,XROTATION,FLAG1,FLAG2,X,Y)：弧线
// Z = closepath()：关闭路径
</script>

<template>
  <svg
    class=" bg-transparent"
    width="100%"
    height="100%"
    :viewBox="`${viewPortX} ${viewPortY} ${viewPortWidth} ${viewPortHeight}`"
  >
    <line
      :x1="props.viewPortX"
      y1="0"
      :x2="props.viewPortX + props.viewPortWidth"
      y2="0"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth * 4"
    />
    <line
      :x1="0"
      :y1="props.viewPortY"
      :x2="0"
      :y2="props.viewPortY + props.viewPortHeight"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth * 4"
    />
    <line
      v-for="item in xGrid"
      :key="symbolFn(item)"
      :x1="item"
      :y1="props.viewPortY"
      :x2="item"
      :y2="props.viewPortY + props.viewPortHeight"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth"
    />
    <line
      v-for="item in yGrid"
      :key="symbolFn(item)"
      :x1="props.viewPortX"
      :y1="item"
      :x2="props.viewPortX + props.viewPortWidth"
      :y2="item"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth"
    />

    <path
      v-show="isPlay === 'stop'"
      id="mainSvg"
      :stroke-width="strokeWidth"
      stroke="currentColor"
      fill="#ffffff90"
      :d="parsedPath"
    />

    <path
      v-show="isPlay === 'stop'"
      stroke="rgb(0, 174, 255)"
      fill="none"
      :d="focusedItemPath"
      :stroke-width="strokeWidth"
    />

    <path
      v-show="isPlay === 'stop'"
      stroke="rgb(255, 25, 255)"
      fill="none"
      :d="hoveredItemPath"
      :stroke-width="strokeWidth"
    />

    <circle
      v-for="item in props.targetPoints"
      v-show="isPlay === 'stop'"
      :key="symbolFn(item)"
      class="target cursor-pointer "
      :style="{ color: props.hoveredItem === item.itemReference ? 'rgb(255, 25, 255)' : (props.focusedItem === item.itemReference) ? 'rgb(0, 174, 255)' : '' }"
      :cx="item.x"
      :cy="item.y"
      :r="5 * strokeWidth"
      :stroke-width="((props.hoveredItem === item.itemReference) || (props.focusedItem === item.itemReference)) ? (8 * strokeWidth) : (2 * strokeWidth)"
      :stroke="props.hoveredItem === item.itemReference ? 'rgba(255,25,255,.3)' : (props.focusedItem === item.itemReference) ? 'rgba(0, 174, 255,.3)' : 'currentColor'"
      fill="currentColor"
      @mousedown.stop=" e => startDrag(item, e)"
      @mouseenter="startHover(item)"
      @mouseleave="stopHover()"
    />

    <circle
      v-for="item in props.controlPoints"
      v-show="isPlay === 'stop'"
      :key="symbolFn(item)"
      class="control cursor-pointer "
      :style="{ color: props.hoveredItem === item.itemReference ? 'rgb(255, 25, 255)' : (props.focusedItem === item.itemReference) ? 'rgb(0, 174, 255)' : '' }"
      :cx="item.x"
      :cy="item.y"
      :r="5 * strokeWidth"
      :stroke-width="((props.hoveredItem === item.itemReference) || (props.focusedItem === item.itemReference)) ? (8 * strokeWidth) : (2 * strokeWidth)"
      :stroke="props.hoveredItem === item.itemReference ? 'rgba(255,25,255,.3)' : (props.focusedItem === item.itemReference) ? 'rgba(0, 174, 255,.3)' : 'currentColor'"
      fill="currentColor"
      @mousedown.stop="e => startDrag(item, e)"
      @mouseenter="startHover(item)"
      @mouseleave="stopHover()"
    />

    <g v-for="loc in props.controlPoints" :key="symbolFn(loc)">
      <line
        v-for="rel in loc.relations"
        :key="symbolFn(rel)"
        class="control cursor-pointer"
        :x1="loc.x"
        :y1="loc.y"
        :x2="rel.x"
        :y2="rel.y"
        :stroke-width="strokeWidth"
        stroke="rgba(0,0,0,0.5)"
      />
    </g>

    <!-- 原始的svg -->
    <g v-show="isPlay !== 'stop'">
      <path
        id="galley_default"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        fill="#ffffff90"
        :d="kDefaultPath"
      />
    </g>

    <!-- 变形后的svg -->
    <g v-for="item in props.stepsData" v-show="false" :key="symbolFn(item)">
      <path
        :id="`galley_${(item as stepsType).values.name}`"
        :stroke-width="strokeWidth"
        stroke="currentColor"
        fill="#ffffff90"
        :d="(item as stepsType).values.path"
      />
    </g>

  </svg>
</template>
