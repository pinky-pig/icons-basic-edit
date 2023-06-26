<script setup lang="ts">
import { Point, SvgItem } from '~/Svg'

const props = useSvgPathStore()

// 初始化Path
initPath(props)

// 初始化命令
const { setFocusedItemFromInput, deleteFn, canDelete, updateCommandValue, insert } = initCommand(props)

function initPath(props: any, _context?: any) {
  const { commandList, parsedPath } = toRefs(props)
  watch(() => parsedPath.value, () => {
    commandList.value = parsedPath.value.path
  })

  // 双向绑定的值和视图,focusedItem判断是视图更改还是文本更改
  watch(() => props.rawPath, (v1) => {
    const { focusedItem } = toRefs(props)
    if (!focusedItem.value) {
      const { reloadPath } = useComposition(props)
      reloadPath(v1)
    }
  })
}

function initCommand(props: any, _context?: any) {
  const {
    focusedItem,
    parsedPath,
    draggedIsNew,
    targetPoints,
    historyDisabled,
    draggedPoint,
  } = toRefs(props)
  const { afterModelChange } = useComposition(props)

  /** 属性面板编辑操作 */
  const setFocusedItemFromInput = (item: SvgItem) => {
    if (focusedItem)
      focusedItem.value = item
  }
  /** 删除 */
  const deleteFn = (item: SvgItem) => {
    focusedItem.value = null
    parsedPath.value.delete(item)
    afterModelChange()
  }
  const canDelete = (item: SvgItem): boolean => {
    const idx = parsedPath.value.path.indexOf(item)
    return idx > 0
  }
  /** 插入 */
  const insert = (type: string, after: SvgItem | null, convert: boolean) => {
    if (convert) {
      if (after) {
        focusedItem.value = parsedPath.value.changeType(after, after.relative ? type.toLowerCase() : type)
        afterModelChange()
      }
    }
    else {
      draggedIsNew.value = true
      const pts = targetPoints.value
      let point1: Point

      let newItem: SvgItem | null = null
      if (after) {
        point1 = after.targetLocation()
      }
      else if (pts.length === 0) {
        newItem = SvgItem.Make(['M', '0', '0'])
        parsedPath.value.insert(newItem)
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
          parsedPath.value.insert(newItem, after ?? undefined)
      }
      setHistoryDisabled(true)
      afterModelChange()

      if (newItem) {
        focusedItem.value = newItem
        draggedPoint.value = newItem.targetLocation()
      }
    }
  }

  function setHistoryDisabled(value: boolean) {
    historyDisabled.value = value
    if (!value) {
      // pushHistory();
    }
  }

  const updateCommandValue = (v, item: SvgItem, idx: number) => {
    const val = Number(v.srcElement.value)
    if (!Number.isNaN(val)) {
      item.values[idx] = Number(val)
      parsedPath.value.refreshAbsolutePositions()
      afterModelChange()
    }
  }

  return {
    setFocusedItemFromInput,
    deleteFn,
    canDelete,
    updateCommandValue,
    insert,
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- All path data -->
    <div class="p-5">
      <CCollapse>
        <template #title>
          Path
        </template>
        <template #default>
          <textarea
            id=""
            v-model="props.rawPath"
            class="w-full max-w-full min-w-full max-h-80 min-h-20 p-2 resize rounded-2xl bg-[var(--input-bg-color)] text-[var(--input-text-color)]" name="" cols="50" rows="8"
          />
        </template>
      </CCollapse>

      <!-- command -->
      <CCollapse>
        <template #title>
          Command
        </template>
        <template #default>
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
        </template>
      </CCollapse>
    </div>
  </div>
</template>
