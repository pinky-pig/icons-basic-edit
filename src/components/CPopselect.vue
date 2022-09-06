<template>
  <n-dropdown :options="options" placement="bottom-start" trigger="click" @select="handleSelect">
    <div
      class=" text- cursor-pointer w-6 h-6 flex rounded-md justify-center items-center active:bg-[var(--panel-button-active-color)]">
      <div i="carbon-overflow-menu-horizontal"></div>
    </div>
  </n-dropdown>

</template>

<script lang="ts" setup>

const props = defineProps({
  canDelete:{
    type:Boolean,
  }
})
const insert = {
  'M':'Move to',
  'L':'Line to',
  'V':'Vertical Line to',
  'H':'Horizontal Line to',
  'C':'Curve to',
  'S':'Shorthand Curve to',
  'Q':'Quadratic Bezier Curve to',
  'T':'Shorthand Quadratic Bezier Curve to',
  'A':'Elliptical Arc',
  'Z':'Close Path',
}
const options = ref(
  [
   {
     label: '新增',
     icon() { return h('div', { i: 'carbon-add', class:' text-base' }) },
     key: 'add',
     children: [
       { label: insert['M'] , key: 'M' , disabled: false , icon() { return h('div', {}, 'M' ) },},
       { label: insert['L'] , key: 'L' , disabled: false , icon() { return h('div', {}, 'L' ) },},
       { label: insert['V'] , key: 'V' , disabled: false , icon() { return h('div', {}, 'V' ) },},
       { label: insert['H'] , key: 'H' , disabled: false , icon() { return h('div', {}, 'H' ) },},
       { label: insert['C'] , key: 'C' , disabled: false , icon() { return h('div', {}, 'C' ) },},
       { label: insert['S'] , key: 'S' , disabled: true  , icon() { return h('div', {}, 'S' ) },},
       { label: insert['Q'] , key: 'Q' , disabled: false , icon() { return h('div', {}, 'Q' ) },},
       { label: insert['T'] , key: 'T' , disabled: false , icon() { return h('div', {}, 'T' ) },},
       { label: insert['A'] , key: 'A' , disabled: false , icon() { return h('div', {}, 'A' ) },},
       { label: insert['Z'] , key: 'Z' , disabled: false , icon() { return h('div', {}, 'Z' ) },},
     ]
   },
   {
     type: 'divider',
     key: 'd1'
   },
   {
     label: '删除',
     icon() { return h('div', { i: 'carbon-trash-can', }) },
     key: 'D',
     disabled: !props.canDelete
   },
 ]
)


type insertType = 'D' | 'M' | 'L' | 'V' | 'H' | 'C' | 'S' | 'Q' | 'T' | 'A' | 'Z'

const emit = defineEmits(['D' , 'M' , 'L' , 'V' , 'H' , 'C' , 'S' , 'Q' , 'T' , 'A' , 'Z'])
const handleSelect = (key: insertType) => {
  emit(key, key)
}

</script>


<style>
.n-dropdown-menu {
  border-radius: 10px;
}
.n-dropdown-menu .n-dropdown-option .n-dropdown-option-body::before {
  border-radius: 8px;
}
</style>
