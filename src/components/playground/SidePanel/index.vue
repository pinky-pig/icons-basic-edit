<script setup lang="ts">
import ToolsPanelCommand from './Command.vue'
import AllPathData from './AllPathData.vue'
import PathOperations from './PathOperations.vue'
</script>

<template>
  <div class="w-full h-full text-start">
    <CSidebar class="h-full ">
      <template #title>
        Settings
      </template>

      <template #content>
        <AllPathData />
        <PathOperations />

        <ToolsPanelCommand />
      </template>
      <template #footer>
        https://yqnn.github.io/svg-path-editor/
      </template>
    </CSidebar>
  </div>
</template>
