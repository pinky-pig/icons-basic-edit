<template>
  <div class="p-4 ">
    <div class=" flex justify-between " @click="switcher">
      <div> {{props.title}} </div>
      <div :i="isOpen ? 'carbon-caret-up': 'carbon-caret-down'" />
    </div>

    <div ref="content" v-show="isOpen" class=" max-h-98 mt-3 overflow-auto">
      <slot></slot>
    </div>

  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title:{
    type: String,
    default:'title'
  }
})

const isOpen = ref(false)
const switcher = () => {
  isOpen.value = !isOpen.value
}
</script>
