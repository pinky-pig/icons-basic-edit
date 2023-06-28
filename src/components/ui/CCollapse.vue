<script lang="ts" setup>
const show = ref(true)
</script>

<template>
  <div class=" flex flex-col flex-auto overflow-auto text-start">
    <div
      class=" flex flex-row tracking-widest cursor-pointer my-10px select-none justify-between items-center"
      @click="show = !show"
    >
      <slot name="title" />
      <div v-if="show" class="opacity-70" i-carbon:chevron-up />
      <div v-else class="opacity-70" i-carbon:chevron-down />
    </div>
    <hr v-if="!show" class="opacity-10">
    <div class=" my-5px ">
      <n-collapse-transition :show="show">
        <slot name="default" />
      </n-collapse-transition>
    </div>
  </div>
</template>
