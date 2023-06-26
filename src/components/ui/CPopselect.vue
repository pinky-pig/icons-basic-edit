<script lang="ts" setup>
const props = defineProps({
  canDelete: {
    type: Boolean,
  },
})
const emit = defineEmits(['D', 'M', 'L', 'V', 'H', 'C', 'S', 'Q', 'T', 'A', 'Z'])
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
      disabled: !props.canDelete,
    },
  ],
)

type insertType = 'D' | 'M' | 'L' | 'V' | 'H' | 'C' | 'S' | 'Q' | 'T' | 'A' | 'Z'

function handleSelect(key: insertType) {
  emit(key, key)
}
</script>

<template>
  <n-dropdown
    :options="options"
    placement="bottom-start"
    trigger="click"
    @select="handleSelect"
  >
    <div
      class=" text- cursor-pointer w-6 h-6 flex rounded-md justify-center items-center active:bg-[var(--panel-button-active-color)]"
    >
      <div i="carbon-overflow-menu-horizontal" />
    </div>
  </n-dropdown>
</template>
