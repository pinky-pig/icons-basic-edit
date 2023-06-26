<script setup lang="ts">
import { Point, SvgItem } from '~/logic/Svg'

const store = useSvgPathStore()

// 初始化Path
watch(() => store.parsedPath, (v) => {
  if (v)
    store.commandList = (v as any).path
})
// 双向绑定的值和视图,focusedItem判断是视图更改还是文本更改
watch(() => store.rawPath, (v1) => {
  const { focusedItem } = toRefs(store)
  if (!focusedItem.value) {
    const { reloadPath } = useComposition(store)
    reloadPath(v1)
  }
})

// 初始化命令
const { afterModelChange } = useComposition(store)

/** 属性面板编辑操作 */
function setFocusedItemFromInput(item: SvgItem) {
  if (store.focusedItem)
    store.focusedItem = item
}
/** 删除 */
function deleteFn(item: SvgItem) {
  store.focusedItem = null
  store.parsedPath!.delete(item)
  afterModelChange()
}
function canDelete(item: SvgItem): boolean {
  const idx = store.parsedPath!.path.indexOf(item)
  return idx > 0
}
/** 插入 */
function insert(type: string, after: SvgItem | null, convert: boolean) {
  if (convert) {
    if (after) {
      store.focusedItem = (store.parsedPath as any).changeType(after, after.relative ? type.toLowerCase() : type)
      afterModelChange()
    }
  }
  else {
    store.draggedIsNew = true
    const pts = store.targetPoints
    let point1: Point

    let newItem: SvgItem | null = null
    if (after) {
      point1 = after.targetLocation()
    }
    else if (pts.length === 0) {
      newItem = SvgItem.Make(['M', '0', '0'])
      store.parsedPath!.insert(newItem)
      point1 = new Point(0, 0)
    }
    else {
      point1 = pts[pts.length - 1]
    }

    if (type.toLowerCase() !== 'm' || !newItem) {
      const relative = type.toLowerCase() === type
      const X = (relative ? 0 : point1.x).toString()
      const Y = (relative ? 0 : point1.y).toString()
      switch (type.toLocaleLowerCase()) {
        case 'm': case 'l': case 't':
          newItem = SvgItem.Make([type, X, Y])
          break
        case 'h':
          newItem = SvgItem.Make([type, X])
          break
        case 'v':
          newItem = SvgItem.Make([type, Y])
          break
        case 's': case 'q':
          newItem = SvgItem.Make([type, X, Y, X, Y])
          break
        case 'c':
          newItem = SvgItem.Make([type, X, Y, X, Y, X, Y])
          break
        case 'a':
          newItem = SvgItem.Make([type, '1', '1', '0', '0', '0', X, Y])
          break
        case 'z':
          newItem = SvgItem.Make([type])
      }
      if (newItem)
        store.parsedPath!.insert(newItem, after ?? undefined)
    }
    setHistoryDisabled(true)
    afterModelChange()

    if (newItem) {
      store.focusedItem = newItem
      store.draggedPoint = newItem.targetLocation() as unknown as SvgItem
    }
  }
}

function setHistoryDisabled(value: boolean) {
  store.historyDisabled = value
  if (!value) {
    // pushHistory();
  }
}

function updateCommandValue(v, item: SvgItem, idx: number) {
  const val = Number(v.srcElement.value)
  if (!Number.isNaN(val)) {
    item.values[idx] = Number(val)
    store.parsedPath!.refreshAbsolutePositions()
    afterModelChange()
  }
}
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
        class=" flex-center gap-2 my-2 py-2 pl-2 rounded-md hover:bg-[var(--panel-hover-bg-color)] select-none"
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
