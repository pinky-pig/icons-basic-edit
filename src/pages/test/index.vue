<script setup lang="ts">

import { useVirtualList } from './helps'

const allItems = Array.from(Array(99999).keys())
const { list, containerProps, wrapperProps } = useVirtualList(
  allItems,
  {
    itemHeight: 22,
  },
)

/**
 * 返回三个值
 *
 * @return list v-for 渲染的值
 * @return boxProps 父级容器
 * @return wrapProps 子容器
 */
const boxProps = {
  onScroll: () => {
    console.log('触发了滚动方法');
  }
}
const wrapProps = computed(() => {
  return {
    style: {
      width: '100%',
      height: `${192 - 10}px`,
      marginTop: `${10}px`,
    },
  }
})

</script>

<template>

  <div class=" w-48 h-48 bg-blue-gray-600 overflow-auto" v-bind="boxProps">
    <div v-bind="wrapProps">
      <div class=" h-24 bg-red-200"    ></div>
      <div class=" h-24 bg-green-200"  ></div>
      <div class=" h-24 bg-blue-200"   ></div>
      <div class=" h-24 bg-purple-200" ></div>
      <div class=" h-24 bg-orange-200" ></div>
    </div>
  </div>



  <div v-bind="containerProps" style="height: 300px">
    <div v-bind="wrapperProps">
      <div v-for="item in list" :key="item.index" style="height: 22px">
        Row: {{ item.data }}
      </div>
    </div>
  </div>

</template>

<route lang="yaml">
name: test
</route>
