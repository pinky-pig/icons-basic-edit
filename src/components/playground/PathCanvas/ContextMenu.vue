<script lang="ts" setup>
import { Point, SvgItem } from '~/controls/Svg'

defineProps({
  x: {
    type: Number,
  },
  y: {
    type: Number,
  },
  showDropdownRef: {
    type: Boolean,
  },
})
const emit = defineEmits(['update:showDropdownRef', 'D', 'M', 'L', 'V', 'H', 'C', 'S', 'Q', 'T', 'A', 'Z'])
const store = useSvgPathStore()
const insertLabel = {
  M: 'Move to',
  L: 'Line to',
  V: 'Vertical Line to',
  H: 'Horizontal Line to',
  C: 'Curve to',
  S: 'Shorthand Curve to',
  Q: 'Quadratic Bezier Curve to',
  T: 'Shorthand Quadratic Bezier Curve to',
  A: 'Elliptical Arc',
  Z: 'Close Path',
}

type insertType = 'D' | 'M' | 'L' | 'V' | 'H' | 'C' | 'S' | 'Q' | 'T' | 'A' | 'Z'

const canDeleteType = computed(() => canDelete(store.focusedItem as any))
function handleSelect(key: insertType) {
  switch (key) {
    case 'D':
      deleteFn(store.focusedItem as any)
      emit('update:showDropdownRef', false)
      break

    default:
      insert(key, store.focusedItem, false)
      emit('update:showDropdownRef', false)
      break
  }
}

function onClickoutside() {
  emit('update:showDropdownRef', false)
}

const options = ref(
  [
    {
      label: '新增',
      icon() { return h('div', { i: 'carbon-add', class: ' text-base' }) },
      key: 'add',
      children: [
        { label: insertLabel.M, key: 'M', disabled: false, icon() { return h('div', {}, 'M') } },
        { label: insertLabel.L, key: 'L', disabled: false, icon() { return h('div', {}, 'L') } },
        { label: insertLabel.V, key: 'V', disabled: false, icon() { return h('div', {}, 'V') } },
        { label: insertLabel.H, key: 'H', disabled: false, icon() { return h('div', {}, 'H') } },
        { label: insertLabel.C, key: 'C', disabled: false, icon() { return h('div', {}, 'C') } },
        { label: insertLabel.S, key: 'S', disabled: true, icon() { return h('div', {}, 'S') } },
        { label: insertLabel.Q, key: 'Q', disabled: false, icon() { return h('div', {}, 'Q') } },
        { label: insertLabel.T, key: 'T', disabled: false, icon() { return h('div', {}, 'T') } },
        { label: insertLabel.A, key: 'A', disabled: false, icon() { return h('div', {}, 'A') } },
        { label: insertLabel.Z, key: 'Z', disabled: false, icon() { return h('div', {}, 'Z') } },
      ],
    },
    {
      type: 'divider',
      key: 'd1',
    },
    {
      label: '删除',
      icon() { return h('div', { i: 'carbon-trash-can' }) },
      key: 'D',
      disabled: !canDeleteType,
    },
  ],
)

////////////////////////////////////////////////

// 初始化命令
const { afterModelChange } = useComposition(store)

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
</script>

<template>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="showDropdownRef"
    :on-clickoutside="onClickoutside"
    @select="handleSelect"
  />
</template>
