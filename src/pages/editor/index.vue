<template>
  <div class="flex flex-row w-screen h-screen ">
    <div class="w-500px h-full">

    </div>
    <div ref="canvas" class=" flex-1">
      <Canvas :viewPortWidth="width" :viewPortHeight="height"></Canvas>
    </div>
  </div>
</template>
<script setup lang="ts">

const canvas = ref(null)
const { width, height } = useElementBounding(canvas)

</script>

<route lang="yaml">
name: icons-editor
path: /icons-editor
meta:
  layout: home
  requiresAuth: false
  id: 2
  string: "2"
</route>
