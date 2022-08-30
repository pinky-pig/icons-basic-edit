<template>
  <n-dropdown :options="options" placement="bottom-start" trigger="click" @select="handleSelect">
    <div
      class=" text- cursor-pointer w-6 h-6 flex rounded-md justify-center items-center active:bg-[var(--property-button-active-color)]">
      <div i="carbon-overflow-menu-horizontal"></div>
    </div>
  </n-dropdown>

</template>

<script lang="ts">

const options = [
  {
    label: '新增',
    icon() { return h('div', { i: 'carbon-add', class:' text-base' }) },
    key: 'add',
    children: [
      { label: ' Move to', key: 'M' , disabled: false , icon() { return h('div', {}, 'M' ) },},
      { label: ' Line to', key: 'L' , disabled: false , icon() { return h('div', {}, 'L' ) },},
      { label: ' Line to', key: 'V' , disabled: false , icon() { return h('div', {}, 'V' ) },},
      { label: ' Line to', key: 'H' , disabled: false , icon() { return h('div', {}, 'H' ) },},
      { label: ' Line to', key: 'C' , disabled: false , icon() { return h('div', {}, 'C' ) },},
      { label: ' Line to', key: 'S' , disabled: true  , icon() { return h('div', {}, 'S' ) },},
      { label: ' Line to', key: 'Q' , disabled: false , icon() { return h('div', {}, 'Q' ) },},
      { label: ' Line to', key: 'T' , disabled: false , icon() { return h('div', {}, 'T' ) },},
      { label: ' Line to', key: 'A' , disabled: false , icon() { return h('div', {}, 'A' ) },},
      { label: ' Line to', key: 'Z' , disabled: false , icon() { return h('div', {}, 'Z' ) },},
    ]
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '删除',
    icon() { return h('div', { i: 'carbon-trash-can', }) },
    key: 'delete',
  },

]

export default defineComponent({
  setup() {
    return {
      options,
      handleSelect(key: string | number) {

      },

    }
  }
})
</script>


<style>
.n-dropdown-menu {
  border-radius: 10px;
}
.n-dropdown-menu .n-dropdown-option .n-dropdown-option-body::before {
  border-radius: 8px;
}
</style>
