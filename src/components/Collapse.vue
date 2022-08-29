<template>
  <div>
    <div class=" flex justify-between leading-14 h-14 items-center p-4 cursor-pointer" @click="switcher">
      <div > {{props.title}} </div>
      <div :i="isOpen ? 'carbon-caret-up': 'carbon-caret-down'" />
    </div>

    <div ref="content" v-show="isOpen" class=" mt-3 overflow-auto">
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
