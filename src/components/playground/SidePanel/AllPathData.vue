<script setup lang="ts">
const store = useSvgPathStore()
</script>

<template>
  <CCollapse>
    <template #title>
      Path
    </template>
    <template #default>
      <textarea
        id=""
        v-model="store.rawPath"
        class="w-full outline-none max-w-full min-w-full max-h-80 min-h-20 p-2 resize rounded-2xl bg-[var(--input-bg-color)] text-[var(--input-text-color)]" name="" cols="50" rows="8"
      />
    </template>
  </CCollapse>
</template>

<style scoped>

</style>
