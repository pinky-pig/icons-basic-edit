<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <slot></slot>
          <naive-provider-content />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
const NaiveProviderContent = defineComponent({
  setup() { },
  render() {
    return h('div')
  },
})
</script>
<style scoped></style>
