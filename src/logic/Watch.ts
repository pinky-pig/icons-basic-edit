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
