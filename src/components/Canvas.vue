<template>
  <svg
    width="100%"
    height="100%"
    :viewBox="viewPortX+' '+viewPortY+' '+viewPortWidth+' '+viewPortHeight"
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
      :x1="props.viewPortX"
      :y1="item"
      :x2="props.viewPortX + props.viewPortWidth"
      :y2="item"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth"
      />

    <path
      :stroke-width="strokeWidth"
      stroke="currentColor"
      fill="rgba(0,0,0,0.5)"
      :d="parsedPath"
    />

    <path
      stroke="rgb(0, 174, 255)"
      fill="none"
      :d="focusedItemPath"
      :stroke-width="strokeWidth"
    />

    <circle
      class="target cursor-pointer "
      v-for="item in props.targetPoints"
      :cx="item.x"
      :cy="item.y"
      :r="3 * strokeWidth"
      :stroke-width="5 * strokeWidth"
      stroke="currentColor"
      fill="transparent"
      @mousedown="startDrag(item)"
    />

    <circle
      class="control cursor-pointer "
      v-for="item in props.controlPoints"
      :cx="item.x"
      :cy="item.y"
      :r="3 * strokeWidth"
      :stroke-width="5 * strokeWidth"
      stroke="currentColor"
      fill="transparent"
      @mousedown="startDrag(item)"
    />

    <g v-for="loc in props.controlPoints" >
      <line
        class="control cursor-pointer"
        v-for="rel in loc.relations"
        :x1="loc.x"
        :y1="loc.y"
        :x2="rel.x"
        :y2="rel.y"
        :stroke-width="strokeWidth"
        stroke="rgba(0,0,0,0.5)"
        />
    </g>

  </svg>
</template>
<script setup lang="ts">
import { Svg, SvgControlPoint, SvgPoint } from '~/pages/editor/Svg';


const props = defineProps({
  viewPortX: {
    type: Number,
    default: 0
  },
  viewPortY: {
    type: Number,
    default: 0
  },
  viewPortWidth: {
    type: Number,
    default: 0
  },
  viewPortHeight: {
    type: Number,
    default: 0
  },
  strokeWidth: {
    type: Number,
    default: 1
  },

  canvasWidth: {
    type: Number,
    default: 100
  },
  canvasHeight: {
    type: Number,
    default: 100
  },

  parsedPath: {
    type: String,
    default: ''
  },

  targetPoints: {
    type: Array<SvgPoint>,
    default: []
  },

  controlPoints: {
    type: Array<SvgControlPoint>,
    default: []
  },

  draggedPoint: {
    type: SvgPoint,
    default: null
  },

  focusedItem: {
    type: Object || null,
    default: null
  },

})

const parsedPath = computed(() => {
  if (props.parsedPath)
    return (props.parsedPath as any).asString()
  else
    return
})

const xGrid = ref()
const yGrid = ref()
watch(props,()=>{
  if (5 * props.viewPortWidth <= props.canvasWidth) {
    xGrid.value = Array(Math.ceil(props.viewPortWidth) + 1).fill(null).map((_, i) => Math.floor(props.viewPortX) + i)
    yGrid.value = Array(Math.ceil(props.viewPortHeight) + 1).fill(null).map((_, i) => Math.floor(props.viewPortY) + i)
  } else {
    xGrid.value = []
    yGrid.value = []
  }
},{ immediate:true })

// 将 dragPoint 传给父组件
const emit = defineEmits(['update:draggedPoint','update:focusedItem'])
const startDrag = (item:SvgPoint) => {
  emit('update:draggedPoint', item)
  emit('update:focusedItem', item.itemReference)
}

const focusedItemPath = computed(() => {
  if (props.focusedItem !== null )
    return props.focusedItem?.asStandaloneString()
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
