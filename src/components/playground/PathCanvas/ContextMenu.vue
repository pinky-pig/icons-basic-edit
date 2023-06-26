<script lang="ts" setup>
defineProps({
  x: { type: Number },
  y: { type: Number },
  showDropdownRef: { type: Boolean },
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

const { deleteFn, canDelete, insert } = initCommand()

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
