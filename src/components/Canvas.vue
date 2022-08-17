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
      stroke="orange"
      fill="transparent"
      :stroke-width="strokeWidth * 4"
      />
    <line
      :x1="0"
      :y1="props.viewPortY"
      :x2="0"
      :y2="props.viewPortY + props.viewPortHeight"
      stroke="orange"
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
  </svg>
</template>
<script setup lang="ts">

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
  }
})

const width = computed(()=> props.viewPortWidth)
const height = computed(()=> props.viewPortHeight)

const xGrid = ref()
const yGrid = ref()
watch([width,height],()=>{
  xGrid.value = Array(Math.ceil(width.value) + 1).fill(null).map((_, i) => Math.floor(props.viewPortX) + i);
  yGrid.value = Array(Math.ceil(height.value) + 1).fill(null).map((_, i) => Math.floor(props.viewPortY) + i);
},{ immediate:true })


</script>
