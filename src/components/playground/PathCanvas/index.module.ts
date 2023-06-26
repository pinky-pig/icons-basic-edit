export function initCanvas(props: any, _context?: any) {
  const { cfg, canvasWidth, canvasHeight } = toRefs(props)
  const { updateViewPort, zoomAuto } = useComposition(props)
  onMounted(() => {
    setTimeout(() => {
      zoomAuto()
    }, 0)
  })
  watch([canvasHeight, canvasWidth], () => {
    updateViewPort(
      cfg.value.viewPortX,
      cfg.value.viewPortY,
      cfg.value.viewPortWidth,
      null,
      true,
    )
  })
}

export function initSvgPath(props: any, _context?: any) {
  const { rawPath } = toRefs(props)
  const { reloadPath } = useComposition(props)
  onMounted(() => {
    setTimeout(() => {
      openPath(rawPath.value, '')
    }, 0)
  })
  function openPath(newPath: string, _name: string): void {
    reloadPath(newPath, true)
  }
}

export function initEventListener(props: any, _context?: any) {
  onMounted(() => {
    const canvas = document.querySelector('#canvas')
    const { draggedEvt, wasCanvasDragged } = toRefs(props)
    const { drag, stopDrag, setZoom } = useComposition(props)
    useEventListener(canvas, 'mousedown', (evt: MouseEvent) => {
      draggedEvt.value = evt
      wasCanvasDragged.value = false
    })
    useEventListener(canvas, 'mouseup', (_evt: MouseEvent) => {
      stopDrag()
    })
    useEventListener(canvas, 'mousemove', (evt: MouseEvent) => {
      // 鼠标左键
      if (evt?.buttons === 1)
        drag(evt)
    })
    useEventListener(canvas, 'wheel', (evt: WheelEvent) => {
      evt.preventDefault()
      setZoom(evt)
    })
  })
}

export function initHistory(props: any, _context?: any) {
  const { rawPath, history, historyCursor, storage } = toRefs(props)
  watch(() => rawPath.value, () => {
    if (rawPath.value !== history.value[historyCursor.value]) {
      historyCursor.value++
      history.value.splice(historyCursor.value, history.value.length - historyCursor.value, rawPath.value)
      storage.value.addPath(storage.value.storedPaths.length === 0 ? 'default' : 'current', rawPath.value)
    }
  }, {
    immediate: true,
  })
}

export function handleScreenshot(props: any, _context?: any) {
  const { rawPath, keyframeCursor, storage } = toRefs(props)
  storage.value.addPath(keyframeCursor.value, rawPath.value)
  storage.value.setIsKeyframePathStatus(keyframeCursor.value, true)
}

export function initRedoUndo(props: any, _context?: any) {
  const {
    history,
    historyCursor,
    historyDisabled,
  } = toRefs(props)
  const { reloadPath } = useComposition(props)

  const canUndo = (): boolean => {
    return historyCursor.value > 0
  }
  const undo = () => {
    if (canUndo()) {
      historyDisabled.value = true
      historyCursor.value--
      reloadPath(history.value[historyCursor.value])
      historyDisabled.value = false
    }
  }

  const canRedo = (): boolean => {
    return historyCursor.value < history.value.length - 1
  }

  const redo = () => {
    if (canRedo()) {
      historyDisabled.value = true
      historyCursor.value++
      reloadPath(history.value[historyCursor.value])
      historyDisabled.value = false
    }
  }

  return {
    redo,
    undo,
  }
}
