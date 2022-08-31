<template>
  <div>
    <div class="select-none flex justify-between leading-10 h-10 items-center px-4 py-1 cursor-pointer" @click="switcher">
      <div > {{props.title}} </div>
      <div :i="isOpen ? 'carbon-caret-up': 'carbon-caret-down'" />
    </div>

    <div ref="content" v-show="isOpen" class="overflow-auto">
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
