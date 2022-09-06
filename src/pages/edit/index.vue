<template>
<n-config-provider :theme="naiveUIDarkTheme">

  <div
    class="z-99 w-screen h-screen p-8 flex flex-col gap-8 bg-[var(--main-background-image)]"
    >
    <div class=" w-full h-4/5 rounded-3xl gap-8 flex flex-row justify-between">
      <div class="w-350px h-full rounded-3xl bg-[var(--tool-bg-color)] text-[var(--tool-text-color)]">
        <PathToolsPanel></PathToolsPanel>
      </div>

      <div class="flex-1 h-full rounded-3xl bg-[var(--canvas-bg)] text-[var(--canvas-text)] overflow-hidden" >
        <PathCanvas
          style="background-image: var(--canvas-bg-imgae);"
          ></PathCanvas>
      </div>

      <div class="w-350px h-full rounded-3xl bg-[var(--tool-bg-color)] text-[var(--tool-text-color)]">
        <PathPropertyPanel></PathPropertyPanel>
      </div>

    </div>

    <div class=" w-full flex-1 rounded-3xl bg-[var(--animate-bg-color)]">

    </div>

    <Footer class=" absolute left-[calc(50%-80px)] bottom-0"></Footer>

  </div>
</n-config-provider>

</template>
<script setup lang="ts">
import PathCanvas from "./PathCanvas.vue"
import PathToolsPanel from "./PathToolsPanel.vue"
import PathPropertyPanel from "./PathPropertyPanel.vue"


</script>

<route lang="yaml">
  name: edit
  meta:
    layout: home
    requiresAuth: false
    id: 3
    string: "3"
  </route>

