import type { Ref } from 'vue-demi'
import { computed, ref, shallowRef, watch } from 'vue-demi'
import type { MaybeRef } from '@vueuse/shared'

export interface UseVirtualListOptions {
  /**
   * item height, accept a pixel value or a function that returns the height
   *
   * @default 0
   */
  itemHeight: number | ((index: number) => number)
  /**
   * the extra buffer items outside of the view area
   *
   * @default 5
   */
  overscan?: number
}

export interface UseVirtualListItem<T> {
  data: T
  index: number
}

export function useVirtualList <T = any>(list: MaybeRef<T[]>, options: UseVirtualListOptions) {
  // dom
  const containerRef: Ref = ref<HTMLElement | null>()
  // dom 的尺寸
  const size = useElementSize(containerRef)
  // 当前的 list 数据
  const currentList: Ref<UseVirtualListItem<T>[]> = ref([])
  // shallowRef:只处理基本数据类型的响应式, 不进行对象的响应式处理。
  const source = shallowRef(list)

  const state: Ref = ref({ start: 0, end: 10 })
  // 每一行的高度。itemHeight 也可是个函数，
  const { itemHeight, overscan = 5 } = options

  // 获取视图容积率
  const getViewCapacity = (containerHeight: number) => {
    if (typeof itemHeight === 'number')
      return Math.ceil(containerHeight / itemHeight)

    const { start = 0 } = state.value
    let sum = 0
    let capacity = 0
    for (let i = start; i < source.value.length; i++) {
      const height = (itemHeight as (index: number) => number)(i)
      sum += height
      if (sum >= containerHeight) {
        capacity = i
        break
      }
    }
    return capacity - start
  }
  // 获取偏移
  const getOffset = (scrollTop: number) => {
    if (typeof itemHeight === 'number')
      return Math.floor(scrollTop / itemHeight) + 1

    let sum = 0
    let offset = 0
    for (let i = 0; i < source.value.length; i++) {
      const height = (itemHeight as (index: number) => number)(i)
      sum += height
      if (sum >= scrollTop) {
        offset = i
        break
      }
    }
    return offset + 1
  }
  // 计算范围
  const calculateRange = () => {
    const element = containerRef.value
    if (element) {
      const offset = getOffset(element.scrollTop)
      const viewCapacity = getViewCapacity(element.clientHeight)

      const from = offset - overscan
      const to = offset + viewCapacity + overscan
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length
          ? source.value.length
          : to,
      }
      currentList.value = source.value
        .slice(state.value.start, state.value.end)
        .map((ele, index) => ({
          data: ele,
          index: index + state.value.start,
        }))
    }
  }
  // 监听
  watch([size.width, size.height, list], () => {
    calculateRange()
  })
  // 总的容器高度
  const totalHeight = computed(() => {
    if (typeof itemHeight === 'number')
      return source.value.length * itemHeight
    return source.value.reduce((sum, _, index) => sum + itemHeight(index), 0)
  })
  // 获取到 Top 的距离
  const getDistanceTop = (index: number) => {
    // 如果传进来的有每行高度，那么直接乘法，得到距离
    if (typeof itemHeight === 'number') {
      const height = index * itemHeight
      return height
    }
    const height = source.value
      .slice(0, index)
      .reduce((sum, _, i) => sum + itemHeight(i), 0)
    return height
  }
  // 滚动到
  const scrollTo = (index: number) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = getDistanceTop(index)
      calculateRange()
    }
  }
  // 距顶部偏移
  const offsetTop = computed(() => getDistanceTop(state.value.start))
  // props 包装
  const wrapperProps = computed(() => {
    return {
      style: {
        width: '100%',
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`,
      },
    }
  })
  // overflow
  const containerStyle: Partial<CSSStyleDeclaration> = { overflowY: 'auto' }

  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange()
      },
      style: containerStyle,
    },
    wrapperProps,
  }
}
