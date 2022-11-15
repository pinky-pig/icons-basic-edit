<script lang="ts" setup>
import { StoredPath } from '~/pages/edit/storage.service'

interface PropsType {
  x: Number
  y: Number
  showDropdownRef: Boolean
}
defineProps<PropsType>()
const emit = defineEmits(['update:showDropdownRef', 'd'])
const options = [
  { label: 'delete', key: 'delete' },
]
const onClickoutside = () => {
  emit('update:showDropdownRef', false)
}
const handleSelect = () => {
  emit('d', true)
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
