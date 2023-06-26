export function initCanvasSize(store) {
  const { width, height } = useElementBounding(store.canvasRef)
  watch([width, height], () => {
    store.canvasWidth = width.value
    store.canvasHeight = height.value
  })
}
