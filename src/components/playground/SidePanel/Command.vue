<script setup lang="ts">
const store = useSvgPathStore()

initWatchCommandSize(store)

const { setFocusedItemFromInput, deleteFn, canDelete, insert, setHistoryDisabled, updateCommandValue } = initCommand()
</script>

<template>
  <!-- command -->
  <CCollapse>
    <template #title>
      Command
    </template>
    <template #default>
      <div
        v-for="item in store.commandList"
        :key="symbolFn(item)"
        class=" flex-center gap-2 my-2 pl-2 rounded-md hover:bg-[var(--panel-hover-bg-color)] select-none"
        :style="{ background: store.focusedItem === item ? 'var(--panel-button-active-bg-color)' : '' }"
        @click="setFocusedItemFromInput(item)"
      >
        <div class="flex-1 flex flex-row gap-1">
          <div class=" max-w-4 w-4 ">
            {{ (item as any).getType() }}
          </div>
          <div v-for="value, idx in (item as any).values" :key="symbolFn(idx)" class="w-8">
            <input
              type="text"
              style="font-size:10px;outline: none;"
              class="w-full text-center border-0 bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
              :value="value"
              @input="v => updateCommandValue(v, item, idx)"
            >
          </div>
        </div>

        <CPopselect
          :can-delete="canDelete(item)"
          @D="deleteFn(item)"
          @M="insert('M', item, false)"
          @L="insert('L', item, false)"
          @V="insert('V', item, false)"
          @H="insert('H', item, false)"
          @C="insert('C', item, false)"
          @S="insert('S', item, false)"
          @Q="insert('Q', item, false)"
          @T="insert('T', item, false)"
          @A="insert('A', item, false)"
          @Z="insert('Z', item, false)"
        />
      </div>
    </template>
  </CCollapse>
</template>

<style scoped>

</style>
