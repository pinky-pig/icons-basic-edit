export function initWatchCanvasSize(store) {
  const { width, height } = useElementBounding(store.canvasRef)
  watch([width, height], () => {
    store.canvasWidth = width.value
    store.canvasHeight = height.value
  })
}

export function initWatchCommandSize(store) {
  watch(() => store.parsedPath, (v) => {
    if (v)
      store.commandList = (v as any).path
  })
  // 双向绑定的值和视图,focusedItem判断是视图更改还是文本更改
  watch(() => store.rawPath, (v1) => {
    const { focusedItem } = toRefs(store)
    if (!focusedItem.value) {
      const { reloadPath } = useComposition(store)
      reloadPath(v1)
    }
  })
}

export function initWatchPathOperations(store) {
  const { afterModelChange } = useComposition(store)

  // ?? null或undefined ; || 先转成 boolean
  const scale = (x: number, y: number) => {
    store.parsedPath.scale(1 * x || 1, 1 * y || 1)
    afterModelChange()
  }

  const translate = (x: number, y: number) => {
    store.parsedPath.translate(1 * x, 1 * y)
    afterModelChange()
  }

  watch(() => [store.scaleX, store.scaleY], (x1, x2) => {
    const x = Number(x1[0] || 1) / (Number(x2[0] || 1))
    const y = Number(x1[1] || 1) / (Number(x2[1] || 1))
    scale(x, y)
  })
  watch(() => [store.translateX, store.translateY], (x1, x2) => {
    const x = Number(x1[0]) - Number(x2[0])
    const y = Number(x1[1]) - Number(x2[1])
    translate(x, y)
  })
}
