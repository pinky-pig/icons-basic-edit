<template>
  <div class=" w-full h-full bg-[#FFFFFF] dark:bg-[#222] flex flex-col items-center">
    <div class=" bg-[#f7f7f7] dark:bg-[#222222] dark:border-[#444444] w-full h-20 border border-r-0 border-[#e0e1e4] flex-center">
      <input
        id="input"
        v-model="keyWord"
        :placeholder="t('svgenerate.search-icon')"
        :aria-label="t('svgenerate.search-icon')"
        type="text"
        autocomplete="false"
        p="x4 y2"
        w="80%"
        h="60%"
        text="center"
        bg="#FFFFFF"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        @keydown.enter="search"
      >

    </div>



    <div class="flex-1 py-4 overflow-auto flex flex-row flex-wrap justify-center ">
      <div class=" w-30 h-30 flex-center cursor-pointer hover:bg-[#f7f7f7] " v-for="(item) in 18">
        <div  i-carbon-campsite inline-block />
        {{item}}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
const keyWord = $ref('')
const search = () => {
  if (keyWord)
    console.log("检索");
}

</script>
