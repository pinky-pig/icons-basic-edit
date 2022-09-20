import { MaybeElement, MaybeElementRef } from "@vueuse/core";
import { browserComputePathBoundingBox } from "./PathCanvas.help";
import { Point, Svg } from "./Svg";

// svg 编辑的方法
export const useComposition = (props: any, context?: any) => {
  let {
    cfg,
    canvasWidth,
    canvasHeight,
    strokeWidth,
    rawPath,
    hoveredItem,
    focusedItem,
    parsedPath,
    targetPoints,
    controlPoints,
    draggedPoint,
    draggedEvt,
    wasCanvasDragged,
  } = toRefs(props)


  function zoomAuto() {
    const bbox = browserComputePathBoundingBox(rawPath.value);
    const k = canvasHeight.value / canvasWidth.value;
    let w = bbox.width + 2;
    let h = bbox.height + 2;
    if (k < h / w) {
      w = h / k;
    } else {
      h = k * w;
    }

    // -1 是为了让原点靠近左上角 1 格。后面的 减是为了让原点靠近中间
    updateViewPort(
      bbox.x - 1,
      bbox.y - 1,
      w,
      h
    )
  }

  /**
  * 更新视图 ViewPort
  * @param x left
  * @param y top
  * @param w 宽
  * @param h 高
  * @param force 是否锁定
  */
  function updateViewPort(x: number, y: number, w: number | null, h: number | null, force = false) {
    if (w === null && h !== null) {
      w = canvasWidth.value * h / canvasHeight.value;
    }
    if (h === null && w !== null) {
      h = canvasHeight.value * w / canvasWidth.value;
    }
    if (!w || !h) {
      return;
    }
    cfg.value.viewPortX = parseFloat((1 * x).toPrecision(6));
    cfg.value.viewPortY = parseFloat((1 * y).toPrecision(6));
    cfg.value.viewPortWidth = parseFloat((1 * w).toPrecision(4));
    cfg.value.viewPortHeight = parseFloat((1 * h).toPrecision(4));
    strokeWidth.value = cfg.value.viewPortWidth / canvasWidth.value;
  }

  /** 重新加载 path */
  function reloadPath(newPath: string, autozoom = false): void {
    hoveredItem.value = null;
    focusedItem.value = null;
    try {
      rawPath.value = newPath
      parsedPath.value = new Svg(rawPath.value);
      reloadPoints();
      if (autozoom) {
        zoomAuto();
      }
    } catch (e) {
      if (!parsedPath.value) {
        parsedPath.value = new Svg('');
      }
    }
  }

  /** 加载控制点及辅助线 */
  function reloadPoints(): void {
    targetPoints.value = parsedPath.value.targetLocations();
    controlPoints.value = parsedPath.value.controlLocations();
  }

  /** 拖拽 */
  function drag(event: MouseEvent | TouchEvent) {
    // 计算当前鼠标的位置
    const pt = eventToLocation(event);
    // 这是触摸版缩放移动，暂不考虑
    const pinchToZoomValue = pinchToZoom(draggedEvt.value, event)
    // 拖拽 dragPoint 移动 svg
    if(draggedPoint.value && parsedPath.value){
      // 当前的鼠标位置保留小数，目的让点在格子上，因为格子的长度是1单位 decimals => n.	小数；十进算术
      const decimals = 0
      pt.x = parseFloat(pt.x.toFixed(decimals));
      pt.y = parseFloat(pt.y.toFixed(decimals));

      // 设置当前鼠标点击的这个点的位置为鼠标的这个位置
      parsedPath.value.setLocation(draggedPoint.value, pt as Point);
      // 以上是更新svg，这个方法是更新svg上的点 dragPoint。重新渲染一遍
      afterModelChange();
      draggedEvt.value = null;
    }else if (draggedEvt.value) {
      // 拖拽画布
      wasCanvasDragged.value = true
      if (pinchToZoomValue !== null){
        const w = pinchToZoomValue.zoom * cfg.value.viewPortWidth;
        const h = pinchToZoomValue.zoom * cfg.value.viewPortHeight;
        const x = cfg.value.viewPortX + pinchToZoomValue.delta.x + (pinchToZoomValue.center.x - cfg.value.viewPortX) * (1 - pinchToZoomValue.zoom);
        const y = cfg.value.viewPortY + pinchToZoomValue.delta.y + (pinchToZoomValue.center.y - cfg.value.viewPortY) * (1 - pinchToZoomValue.zoom);

        updateViewPort( x, y, w, h )
      } else {
        const oriPt = eventToLocation(draggedEvt.value);
        let x = cfg.value.viewPortX + (oriPt.x - pt.x)
        let y = cfg.value.viewPortY + (oriPt.y - pt.y)
        let w = cfg.value.viewPortWidth
        let h = cfg.value.viewPortHeight

        updateViewPort( x, y, w, h )
      }
      draggedEvt.value = event;
    }
  }
  function pinchToZoom(previousEvent: MouseEvent | TouchEvent, event: MouseEvent | TouchEvent){
    if (window.TouchEvent
      && previousEvent instanceof TouchEvent
      && event instanceof TouchEvent
      && previousEvent.touches.length >= 2
      && event.touches.length >= 2) {
      const pt = eventToLocation(event, 0);
      const pt2 = eventToLocation(event, 1);
      const oriPt = eventToLocation(previousEvent, 0);
      const oriPt2 = eventToLocation(previousEvent, 1);
      const ptm = { x: 0.5 * (pt.x + pt2.x), y: 0.5 * (pt.y + pt2.y) };
      const oriPtm = { x: 0.5 * (oriPt.x + oriPt2.x), y: 0.5 * (oriPt.y + oriPt2.y) };
      const delta = { x: oriPtm.x - ptm.x, y: oriPtm.y - ptm.y };
      const k =
        Math.sqrt((oriPt.x - oriPt2.x) * (oriPt.x - oriPt2.x) + (oriPt.y - oriPt2.y) * (oriPt.y - oriPt2.y)) /
        Math.sqrt((pt.x - pt2.x) * (pt.x - pt2.x) + (pt.y - pt2.y) * (pt.y - pt2.y));
      return { zoom: k, delta, center: ptm };
    }
    return null;
  }
  function eventToLocation(event: MouseEvent | TouchEvent, idx = 0): { x: number, y: number } {
    const canvas = document.querySelector('#canvas') as MaybeElementRef<MaybeElement>
    const { top, left, } = useElementBounding(canvas)
    const touch = event instanceof MouseEvent ? event : event.touches[idx];
    const x = cfg.value.viewPortX + (touch.clientX - left.value) * strokeWidth.value;
    const y = cfg.value.viewPortY + (touch.clientY - top.value) * strokeWidth.value;
    return { x, y };
  }
  function afterModelChange(): void {
    reloadPoints();
    rawPath.value = parsedPath.value.asString(4, false);
  }
  function stopDrag() {

    if (!draggedPoint.value && !wasCanvasDragged.value) {
      // 清除选中的高亮路径 -- 只有当前没有draggedPoint和画布没有被拖动
      focusedItem.value = null;
    }
    // 清除拖拽画布
    draggedEvt.value = null
    // 清除拖拽 dragPoint
    draggedPoint.value = null

  }

  /** 缩放 */
  function setZoom(evt: WheelEvent) {
    const scale = Math.pow(1.005, evt.deltaY);
    const pt = eventToLocation(evt);
    zoomViewPort(scale, pt);
  }
  /**
   * 更新viewport
   */
  function zoomViewPort(scale: number, pt?: { x: number, y: number }) {
    if (!pt) {
      pt = { x: cfg.value.viewPortX + 0.5 * cfg.value.viewPortWidth, y: cfg.value.viewPortY + 0.5 * cfg.value.viewPortHeight };
    }
    let x = cfg.value.viewPortX + ((pt.x - cfg.value.viewPortX) - scale * (pt.x - cfg.value.viewPortX));
    let y = cfg.value.viewPortY + ((pt.y - cfg.value.viewPortY) - scale * (pt.y - cfg.value.viewPortY));
    let w = scale * cfg.value.viewPortWidth;
    let h = scale * cfg.value.viewPortHeight;
    updateViewPort( x, y, w, h )
  }


  return {
    updateViewPort,
    zoomAuto,
    reloadPath,
    drag,
    stopDrag,
    setZoom,
    afterModelChange,
  }
}


// 拖拽动画的方法
export const useDragKeyframeToAnimate = (props: any, context?: any) => {
  let { isDraggingKeyframe,stepsData } = toRefs(props)


  function dragStartKeyframe(event,item): void{
    event.dataTransfer.setData("SvgData", JSON.stringify(item))
    isDraggingKeyframe.value = true
  }

  const allowDrop = (event) => {
    event.preventDefault()
  }
  const drop = (event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("SvgData"))
    isDraggingKeyframe.value = false

    // 匹配模式：匹配一个分号及紧接其前后所有可能出现的连续的不可见符号。
    // var pattern = /\s*;\s*/
    let number = event.target.className.match(/pos_(\S*)/)[1]
    stepsData.value.push({
      key: number,
      values: data
    })
  }
  const dragenter = (event) => {
    event.target.style.opacity = 1
  }
  const dragleave = (event) => {
    event.target.style.opacity = 0
  }

  return {
    dragStartKeyframe,
    allowDrop,
    drop,
    dragenter,
    dragleave,
  }
}

