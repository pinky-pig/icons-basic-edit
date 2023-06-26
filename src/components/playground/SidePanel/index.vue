<script setup lang="ts">
import ToolsPanelCommand from './Command.vue'
import AllPathData from './AllPathData.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="p-5">
      <!-- All path data -->
      <AllPathData />

      <!-- command -->
      <ToolsPanelCommand />
    </div>
  </div>
</template>
