<template>
  <n-config-provider>
    <n-theme-editor>
      <div class="w-screen h-screen">
        <n-select v-model:value="value" :options="options" />
      </div>
    </n-theme-editor>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NThemeEditor } from 'naive-ui'

const value = ref(null)
const options = [
  {
    label: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  }]
</script>
