<template>
  <div>
    <div class="hover:bg-[var(--property-button-hover-bg-color)] rounded-md select-none flex justify-between leading-10 h-10 items-center mx-2 px-2 py-1 cursor-pointer" @click="switcher">
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
