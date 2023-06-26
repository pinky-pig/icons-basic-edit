export function initCanvas(store) {
  const { updateViewPort, zoomAuto } = useComposition(store)
  onMounted(() => {
    setTimeout(() => {
      zoomAuto()
    }, 0)
  })
  watch(() => [store.canvasHeight, store.canvasWidth], () => {
    updateViewPort(
      store.cfg.viewPortX,
      store.cfg.viewPortY,
      store.cfg.viewPortWidth,
      null,
      true,
    )
  })
}

export function initSvgPath(store) {
  const { reloadPath } = useComposition(store)
  onMounted(() => {
    setTimeout(() => {
      openPath(store.rawPath, '')
    }, 0)
  })
  function openPath(newPath: string, _name: string): void {
    reloadPath(newPath, true)
  }
}

export function initEventListener(store) {
  onMounted(() => {
    const canvas = document.querySelector('#canvas')
    const { drag, stopDrag, setZoom } = useComposition(store)
    useEventListener(canvas, 'mousedown', (evt: MouseEvent) => {
      store.draggedEvt = evt
      store.wasCanvasDragged = false
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

export function initHistory(store) {
  watch(() => store.rawPath, () => {
    if (store.rawPath !== store.history[store.historyCursor]) {
      store.historyCursor++
      store.history.splice(store.historyCursor, store.history.length - store.historyCursor, store.rawPath)
      store.storage.addPath(store.storage.storedPaths.length === 0 ? 'default' : 'current', store.rawPath)
    }
  }, {
    immediate: true,
  })
}

export function initRedoUndo(store) {
  const { reloadPath } = useComposition(store)

  const canUndo = (): boolean => {
    return store.historyCursor > 0
  }
  const undo = () => {
    if (canUndo()) {
      store.historyDisabled = true
      store.historyCursor--
      reloadPath(store.history[store.historyCursor])
      store.historyDisabled = false
    }
  }

  const canRedo = (): boolean => {
    return store.historyCursor < store.history.length - 1
  }

  const redo = () => {
    if (canRedo()) {
      store.historyDisabled = true
      store.historyCursor++
      reloadPath(store.history[store.historyCursor])
      store.historyDisabled = false
    }
  }

  return {
    redo,
    undo,
  }
}

export function main() {
  const store = useSvgPathStore()

  initCanvas(store)
  initSvgPath(store)
  initEventListener(store)
  initHistory(store)
}
