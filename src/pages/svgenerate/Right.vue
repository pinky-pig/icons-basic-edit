<template>
  <div class=" w-full h-full bg-[#F5F6F6] dark:bg-[#222]">
    <ContainerComponent class=" w-150px mx-auto"></ContainerComponent>


    <pre class="language-ts">
      <code class="language-ts">
        function vitesse() {
          const foo = 'bar'
          console.log(foo)
        }
    </code>
    </pre>

  </div>
</template>
<script setup lang="ts">
import { ContainerComponent } from '~/components/StarportSvg'
</script>
<style>
@import "prism-theme-vars/base.css";
@import "prism-theme-vars/to-codemirror.css";

/* --prism prefix will alias to --cm automatically */
:root {
  --prism-foreground: #393a34;
  --prism-background: #fbfbfb;
}</style>
