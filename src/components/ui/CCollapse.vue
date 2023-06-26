<script lang="ts" setup>
const show = ref(true)
</script>

<template>
  <div class=" flex flex-col flex-auto overflow-auto text-start">
    <div
      class=" flex flex-row tracking-widest cursor-pointer my-10px select-none"
      @click="show = !show"
    >
      <slot name="title" />
    </div>

    <div class=" my-5px ">
      <n-collapse-transition :show="show">
        <slot name="default" />
      </n-collapse-transition>
    </div>
  </div>
</template>
