<script setup lang="ts">
import ToolsPanelCommand from './Command.vue'
import AllPathData from './AllPathData.vue'
import PathOperations from './PathOperations.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full h-full overflow-y-auto p-5">
      <AllPathData />
      <PathOperations />

      <ToolsPanelCommand />
    </div>
  </div>
</template>
