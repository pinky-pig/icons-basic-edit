<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number,
    default: 1,
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 50,
  },
})

const emit = defineEmits(['update:value'])

const sliderValue = props.value
watch(() => sliderValue, (v1, v2) => {
  emit('update:value', v1)
})
</script>

<template>
  <!-- <input class="rangeMain " v-model="value" type="range" name="volume" :min="props.min" :max="props.max"> -->
  <input v-model="sliderValue" class="rangeMain " type="range" name="volume" :min="props.min" :max="props.max">
</template>

<style scoped>
.rangeMain {
  @apply dark:bg-[#e5e7eb];
  margin: auto;
  width: 100%;
  background: #374151;
  outline: none;
  -webkit-appearance: none;
  /*清除系统默认样式*/
  height: 3px;
  /*横条的高度*/
}

input[type="range"]::-webkit-slider-thumb {
  @apply dark:bg-[#e5e7eb];
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #374151;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3),
    0 3px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  -webkit-appearance: none;
  border: 0;
}
</style>
