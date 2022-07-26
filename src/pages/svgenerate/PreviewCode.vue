<template>
 <pre>
    <code :class="'language-'+ type" v-html="Prism.highlight(props.code, Prism.languages[props.type], props.type)"></code>
 </pre>

</template>

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
<style>
@import "prism-theme-vars/base.css";
@import "prism-theme-vars/to-codemirror.css";

/* --prism prefix will alias to --cm automatically */
:root {
  --prism-foreground: #393a34;
  --prism-background: #fbfbfb;
}</style>

