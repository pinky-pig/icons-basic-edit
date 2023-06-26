<script setup lang="ts">
const store = useSvgPathStore()
initWatchPathOperations(store)
const transformType = reactive([
  {
    label: 'Scale',
    value: [
      computed({
        set(v) { store.scaleX = Number(v) },
        get() {
          return store.scaleX
        },
      }),
      computed({
        set(v) { store.scaleY = Number(v) },
        get() {
          return store.scaleY
        },
      }),
    ],
  },
  {
    label: 'Translate',
    value: [
      computed({
        set(v) { store.scaleX = Number(v) },
        get() {
          return store.translateX
        },
      }),
      computed({
        set(v) { store.scaleX = Number(v) },
        get() {
          return store.translateY
        },
      }),
    ],
  },
])
</script>

<template>
  <CCollapse>
    <template #title>
      PATH OPERATIONS
    </template>
    <template #default>
      <div class=" flex flex-col select-none">
        <!-- command -->
        <div class=" flex flex-col gap-3 flex-grow-0 flex-shrink-0">
          <div v-for="(item, index) in transformType" :key="index" class="h-34px overflow-auto cursor-default px-3 mx-2 flex flex-row items-center gap-2">
            <div class="text-lg flex justify-center items-center rounded-lg w-1/3 h-full bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
              {{ item.label }}
            </div>

            <div v-for="it, idx in item.value" :key="symbolFn(idx)" style="border-radius: 10px;" class=" relative flex-1 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
              <div class="input-label">
                {{ item.value.length === 1 ? ' ' : (idx === 0 ? 'x' : 'y') }}
              </div>
              <input
                v-model="transformType[index].value[idx].value"
                type="text"
                style="font-size:18px;outline: none;"
                class=" w-full h-full border-0  bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </CCollapse>
</template>

<style scoped>
.input-label{
  color: var(--input-text-color);
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  position: absolute;
  left: 10px;
  top: 5px;
}
</style>
