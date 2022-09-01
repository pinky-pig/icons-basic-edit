<template>
  <div>
    <div class="hover:bg-[var(--panel-hover-bg-color)] rounded-md select-none flex justify-between leading-10 h-10 items-center mx-2 px-2 py-1 cursor-pointer" @click="switcher">
      <div > {{props.title}} </div>
      <div i="carbon-caret-up" :class="isOpen ? 'rotate-180' : 'rotate-90'" class="transition ease-in-out duration-200"  />
    </div>

    <div ref="content" v-show="isOpen" class="overflow-auto pl-4  ">
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
