<template>
  <svg width="100%" height="100%" >
    <line
      :x1="props.viewPortX"
      y1="0"
      :x2="props.viewPortX + props.viewPortWidth"
      y2="0"
      stroke="orange"
      fill="transparent"
      stroke-width="0.08241758241758242"
      />
    <line
      :x1="0"
      :y1="props.viewPortY"
      :x2="0"
      :y2="props.viewPortY + props.viewPortHeight"
      stroke="orange"
      fill="transparent"
      stroke-width="0.08241758241758242"
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
  }
})

let width = computed(()=> props.viewPortWidth)
// let height = computed(()=> props.viewPortHeight)

watch(width,()=>{
  let xGrid = Array(Math.ceil(width.value) + 1).fill(null).map((_, i) => Math.floor(width.value) + i);
  // console.log(yGrid);
  // let yGrid = Array(Math.ceil(height.value) + 1).fill(null).map((_, i) => Math.floor(height.value) + i);
  console.log(xGrid);
})

// watch(height,()=>{
//   let xGrid = Array(Math.ceil(width.value) + 1).fill(null).map((_, i) => Math.floor(width.value) + i);
//   let yGrid = Array(Math.ceil(height.value) + 1).fill(null).map((_, i) => Math.floor(height.value) + i);
//   console.log(xGrid);
//   console.log(yGrid);
// })


</script>
