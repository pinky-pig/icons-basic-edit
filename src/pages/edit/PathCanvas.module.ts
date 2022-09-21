import { useComposition } from './composititon'


export function initCanvas(props: any, context?: any){
  let { cfg, canvasWidth, canvasHeight, } = toRefs(props)
  let { updateViewPort,zoomAuto } = useComposition(props)
  onMounted(() => {
    setTimeout(() => {
      zoomAuto();
    }, 0);
  })
  watch([canvasHeight, canvasWidth], () => {
    updateViewPort(
      cfg.value.viewPortX,
      cfg.value.viewPortY,
      cfg.value.viewPortWidth,
      null,
      true
    )
  })
}

export function initSvgPath(props: any, context?: any){
  let { rawPath } = toRefs(props)
  let { reloadPath } = useComposition(props)
  onMounted(() => {
    setTimeout(() => {
      openPath(rawPath.value, '');
    }, 0);
  })
  function openPath(newPath: string, name: string): void {
    reloadPath(newPath, true);
  }
}

export function initEventListener(props: any, context?: any){
  onMounted(() => {
    const canvas = document.querySelector('#canvas')
    let { draggedEvt,wasCanvasDragged } = toRefs(props)
    let { drag, stopDrag, setZoom } = useComposition(props)
    useEventListener(canvas, 'mousedown', (evt: MouseEvent) => {
      draggedEvt.value = evt
      wasCanvasDragged.value = false
    })
    useEventListener(canvas, 'mouseup', (evt: MouseEvent) => {
      stopDrag()
    })
    useEventListener(canvas, 'mousemove', (evt: MouseEvent) => {
      // 鼠标左键
      if (evt?.buttons === 1) {
        drag(evt)
      }
    })
    useEventListener(canvas, 'wheel', (evt: WheelEvent) => {
      evt.preventDefault()
      setZoom(evt)
    })
  })
}

export function initHistory(props: any, context?: any){
  let { rawPath,history,historyCursor,storage } = toRefs(props)
  watch(() => rawPath.value, () => {
    if ( rawPath.value !== history.value[historyCursor.value]) {
      historyCursor.value ++;
      history.value.splice(historyCursor.value, history.value.length - historyCursor.value, rawPath.value);
      storage.value.addPath('current', rawPath.value);
    }
  },{
    immediate:true
  })
}

export function handleScreenshot(props: any, context?: any){
  let { rawPath,keyframeCursor,storage } = toRefs(props)
  storage.value.addPath(keyframeCursor.value, rawPath.value)
  storage.value.setIsKeyframePathStatus(keyframeCursor.value, true)
}



