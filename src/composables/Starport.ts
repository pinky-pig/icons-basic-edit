import { DefineComponent, Ref } from "vue";
import { Teleport, h } from 'vue'

export const createStarport = (component:DefineComponent<{},{},any>) => {
  /**
   * 两个组件，Proxy（移动前的位置），Container（要移动到的位置）
   */

  // 用于获取移动后的位置
  const containerRef = ref<HTMLElement>()
  // 终点的位置
  const { top, left } = useElementBounding(containerRef)
  let endLeft:Ref<any> = ref(left)
  let endTop:Ref<any> = ref(top)
  // 是否结束移动。 true 显示，teleport不传送，false 销毁，teleport传送。
  const isFly = ref(true)
  // Container组件传值，用于传给移动后的组件
  const attrs = ref<any>(null)

  // 移动的位置
  let floatLeft:Ref<any> = ref()
  let floatTop:Ref<any> = ref()

  /** 创建Container组件，目的是为了占位（给其赋ref，将其坐标拿出来） */
  const ContainerComponent = defineComponent({
    setup(props,ctx){
      // 在组件卸载之前，将变量 isFly 重置
      onUnmounted(() => {
        isFly.value = true
      })
      attrs.value = ctx.attrs
      return () => h('div',{ ref: containerRef, id: 'container'})
    }
  })

  /** 创建Proxy组件，将传入的组件，用一层div包住渲染，再在其div上移动，移动到 container的位置后，通过teleport传到其dom */
  const ProxyComponent = defineComponent({
    setup(props,ctx){

      // 起点的位置
      const storeSvg = useSvgStore()
      let startLeft:Ref<any> = ref()
      let startTop:Ref<any> = ref()

      watch(() => storeSvg.selectedSvgDom, (v1, v2) => {
        if (v1) {
          const { top, left } = useElementBounding(v1)
          startTop.value = top.value
          startLeft.value = left.value

          // 有起点的时候，设置起点的位置。不需要动画
          isFly.value = true
          hasTransition.value = false
          floatLeft.value = startLeft.value
          floatTop.value = startTop.value

          // 开始移动，从起点到终点，设置动画
          setTimeout(() => {
            hasTransition.value = true
            floatLeft.value = endLeft.value
            floatTop.value = endTop.value
          });
        }
      })

      // 是否有动画。设置起点的时候不需要，起点到终点的时候需要
      const hasTransition = ref(false)

      const getStyle = $computed(() => {
        return {
          position: 'fixed',
          fontSize:'50px',
          transition: hasTransition ? 'all 800ms ease-in-out 0s' : '',
          left: `${floatLeft.value}px`,
          top: `${floatTop.value}px`,
          display: isFly.value ? 'block' : 'none',
        }
      })

      return () => {
        return h(
          'div',
          {
            style:getStyle,
            onTransitionend: async() => {
              await nextTick()
              isFly.value = false
              console.log('降落')
            },
          },
          h(
            Teleport,
            { to: isFly.value ? 'body' : '#container', disabled: isFly.value },
            h(component,{ ...attrs.value })
          ),
        )
      }
    }
  })

  return {
    ContainerComponent,ProxyComponent
  }

}
