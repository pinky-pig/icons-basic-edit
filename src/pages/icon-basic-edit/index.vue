<!-- eslint-disable vue/component-name-in-template-casing -->
<script setup lang="ts">
import Left from './Left.vue'
import Right from './Right.vue'
import Main from './Main.vue'
</script>

<template>
  <div class=" flex flex-row w-screen h-screen dark:bg-red-100 ">
    <section class=" h-screen w-[370px] min-w-[370px] border-r-1 border-gray-300 dark:bg-[#222222] dark:border-[#DDDDDD]">
      <Left />
    </section>
    <div class=" h-screen flex-1 dark:bg-[#222222]">
      <!-- <Footer /> -->
      <Main />
    </div>

    <section class=" h-screen w-[370px] min-w-[370px] border-l-1 border-gray-300 dark:bg-[#222222] dark:border-[#DDDDDD]">
      <Right />
    </section>
  </div>
</template>

<route lang="yaml">
name: name-override
path: /rename-route
meta:
  layout: home
  requiresAuth: false
  id: 1234
  string: '1234'
</route>
