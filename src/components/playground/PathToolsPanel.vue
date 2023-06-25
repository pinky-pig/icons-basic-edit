<script setup lang="ts">
import { initCommand, initPath } from './PathToolsPanel.module'

const props = useSvgPathStore()

// 初始化Path
initPath(props)

// 初始化命令
const { setFocusedItemFromInput, deleteFn, canDelete, updateCommandValue, insert } = initCommand(props)
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- All path data -->
    <div class=" flex flex-col p-5">
      <div class=" h-40px flex flex-row items-center gap-2">
        <div class="text-2xl" i="carbon-text-annotation-toggle " />
        <div class=" text-xl  tracking-widest">
          Path
        </div>
      </div>

      <div>
        <textarea
          id=""
          v-model="props.rawPath"
          class="w-full max-w-full min-w-full max-h-80 min-h-20 p-2 resize rounded-2xl bg-[var(--input-bg-color)] text-[var(--input-text-color)]" name="" cols="50" rows="8"
        />
      </div>
    </div>

    <!-- command -->
    <div class=" flex flex-col flex-auto overflow-auto ">
      <div class=" flex flex-row tracking-widest px-5">
        Command
      </div>

      <div class="overflow-auto cursor-default px-3 mx-2">
        <div
          v-for="item in props.commandList"
          :key="symbolFn(item)"
          class=" flex-center gap-2 my-2 py-2 pl-2 rounded-md hover:bg-[var(--panel-hover-bg-color)]"
          :style="{ background: props.focusedItem === item ? 'var(--panel-button-active-bg-color)' : '' }"
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
      </div>
    </div>
  </div>
</template>
