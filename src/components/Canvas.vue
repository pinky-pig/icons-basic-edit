<template>
  <svg width="100%" height="100%">
    <line 
      :x1="props.viewPortX" 
      y1="0" 
      :x2="props.viewPortX + props.viewPortWidth" 
      y2="0" 
      stroke="orange" 
      fill="transparent" 
      stroke-width="5"
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
    default: 50
  },
  viewPortHeight: {
    type: Number,
    default: 0
  }
})
</script>
