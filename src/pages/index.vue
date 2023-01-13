<script setup lang="ts">
import edit from './edit/index.vue'
import IconBasicEdit from './icon-basic-edit/index.vue'
</script>

<template>
  <edit />
  <!-- <IconBasicEdit /> -->
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: false
  id: 1234
</route>
