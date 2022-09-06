
<script setup lang="ts">
const value = ref('Scale')
const options = [
  {
    label: "Scale",
    value: 'Scale',
  },
  {
    label: 'Translate',
    value: 'Translate'
  }
]
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- All path data -->
    <div class=" flex flex-col items-start p-5">
      <div class=" text-xl  tracking-widest"> 属性 </div>
    </div>

    <!-- command -->
    <div class=" flex flex-col flex-auto overflow-auto ">
      <div class=" flex flex-row tracking-widest px-5 pb-4">
        Morph
      </div>

      <div class="h-34px overflow-auto cursor-default px-3 mx-2 flex flex-row justify-center items-center gap-2">
        <div class=" w-1/3 h-full ">
          <n-select v-model:value="value" :options="options" />
        </div>
        <div style="border-radius: 10px;" class=" x-input w-1/3 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <input
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0 focus:ring-0 bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
            />
        </div>
        <div style="border-radius: 10px;" class=" y-input w-1/3 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <input
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0 focus:ring-0 bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
            />
        </div>

      </div>
    </div>

  </div>
</template>
<style>
.n-base-selection {
  border-radius: 10px !important;
}
.n-base-select-menu{
  border-radius: 10px !important;
}
.x-input::before{
  content: 'x';
  color: var(--input-text-color);
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  margin-left: -20px;
  text-align: right;
  position: absolute;
}
.y-input::before{
  content: 'y';
  color: var(--input-text-color);
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  margin-left: -20px;
  text-align: right;
  position: absolute;
}
</style>
