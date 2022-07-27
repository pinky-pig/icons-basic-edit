<script setup lang="ts">
import Prism from 'prismjs';
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'html'
  }
})
</script>

<template>
  <pre class="w-full">
    <code :class="'language-'+ type" v-html="Prism.highlight(props.code, Prism.languages[props.type], props.type)"></code>
  </pre>
</template>

