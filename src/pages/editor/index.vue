<template>
  <div class="flex flex-row w-screen h-screen ">
    <div ref="element" class="w-500px h-full">

    </div>
    <div ref="canvas" class=" flex-1 min-w-10">
      <Canvas
        :viewPortWidth="cfg.viewPortWidth"
        :viewPortHeight="cfg.viewPortHeight"
        :viewPortX="cfg.viewPortX"
        :viewPortY="cfg.viewPortY"
        :strokeWidth="strokeWidth"
        ></Canvas>
    </div>
  </div>
</template>
<script lang="ts" setup>

let canvasWidth = 100
let canvasHeight = 100
let cfg = reactive({
  viewPortX:0,
  viewPortY:0,
  viewPortWidth:0,
  viewPortHeight:0,
})
let strokeWidth = ref(0)

const canvas = ref(null)
const { width, height } = useElementBounding(canvas)
watch([width,height],() => {
  canvasWidth = width.value
  canvasHeight = height.value
  zoomAuto()
})

// useEventListener(canvas, 'wheel', (evt:WheelEvent) => {
//   const scale = Math.pow(1.005, evt.deltaY);
//   const pt = eventToLocation(evt);
//   zoomViewPort(scale, pt);
// })
zoomAuto()

/**
 * 滚轮放大缩小更新计算视图 ViewPort
 */
function zoomAuto(){
  const rawPath = "M 4 8 L 10 1 L 13 0 L 12 3 L 5 9 C 6 10 6 11 7 10 C 7 11 8 12 7 12 A 1.42 1.42 0 0 1 6 13 A 5 5 0 0 0 4 10 Q 3.5 9.9 3.5 10.5 T 2 11.8 T 1.2 11 T 2.5 9.5 T 3 9 A 5 5 90 0 0 0 7 A 1.42 1.42 0 0 1 1 6 C 1 5 2 6 3 6 C 2 7 3 7 4 8 M 10 1 L 10 3 L 12 3 L 10.2 2.8 L 10 1"
  const bbox = browserComputePathBoundingBox(rawPath);
  const k = canvasHeight / canvasWidth;
  let w = bbox.width + 2;
  let h = bbox.height + 2;
  if (k < h / w) {
    w = h / k;
  } else {
    h = k * w;
  }

  updateViewPort(
    bbox.x - 1,
    bbox.y - 1,
    w,
    h
  )
}

/**
 * 计算当前svg的box
 * @param path Svg
 */
function browserComputePathBoundingBox(path) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svgEl = document.createElementNS(svgNS, 'svg');
  svgEl.style.position = 'absolute';
  svgEl.style.width = '0px';
  svgEl.style.height = '0px';
  const pathEl = document.createElementNS(svgNS, 'path');
  pathEl.setAttributeNS(null, 'd', path);
  svgEl.appendChild(pathEl);
  document.body.appendChild(svgEl);
  const result = pathEl.getBBox();
  svgEl.remove();
  return result;
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
  if (w === null && h !==null) {
    w = canvasWidth * h / canvasHeight;
  }
  if (h === null && w !==null) {
    h = canvasHeight * w / canvasWidth;
  }
  if (!w || !h) {
    return;
  }
  cfg.viewPortX = parseFloat((1 * x).toPrecision(6));
  cfg.viewPortY = parseFloat((1 * y).toPrecision(6));
  cfg.viewPortWidth = parseFloat((1 * w).toPrecision(4));
  cfg.viewPortHeight = parseFloat((1 * h).toPrecision(4));
  strokeWidth.value = cfg.viewPortWidth / canvasWidth;
}

/**
 * wheel滚动的位置
 * @param event wheel 事件
 * @param idx
 */
// function eventToLocation(event: MouseEvent | TouchEvent, idx = 0): {x: number, y: number} {
//   const { top, left,} = useElementBounding(canvas)
//   const touch = event instanceof MouseEvent ? event : event.touches[idx];
//   const x = cfg.viewPortX + (touch.clientX - left.value) * strokeWidth.value;
//   const y = cfg.viewPortY + (touch.clientY - top.value) * strokeWidth.value;
//   return {x, y};
// }
/**
 * 更新viewport
 */
// function zoomViewPort(scale: number,  pt?: {x: number, y: number}){
//   if (!pt) {
//     pt = {x: cfg.viewPortX + 0.5 * cfg.viewPortWidth, y: cfg.viewPortY + 0.5 * cfg.viewPortHeight};
//   }
//   cfg.viewPortWidth = scale * cfg.viewPortWidth;
//   cfg.viewPortHeight = scale * cfg.viewPortHeight;
//   cfg.viewPortX = cfg.viewPortX + ((pt.x - cfg.viewPortX) - scale * (pt.x - cfg.viewPortX));
//   cfg.viewPortY = cfg.viewPortY + ((pt.y - cfg.viewPortY) - scale * (pt.y - cfg.viewPortY));
// }
</script>

<route lang="yaml">
name: icons-editor
path: /icons-editor
meta:
  layout: home
  requiresAuth: false
  id: 2
  string: "2"
</route>
