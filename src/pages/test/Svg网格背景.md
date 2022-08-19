# Svg网格背景
> 学习 [svg-path-editor](https://yqnn.github.io/svg-path-editor/) 源码

- 网格背景
- 格子尺寸适应 svg 的大小
- 背景尺寸适应 dom 的尺寸
- 支持鼠标滚轮 wheel 放大缩小
- 支持窗口 resize 自适应


## 1.创建一个 Dom Container （父组件）

```html
<template>
  <div class="flex flex-row w-screen h-screen bg-[#f7f7f7] dark:bg-[#222222] text-[#374151] dark:text-[#e5e7eb] ">
    <div ref="canvas" class=" w-full h-full min-w-10">
      <Canvas
        :viewPortWidth="cfg.viewPortWidth"
        :viewPortHeight="cfg.viewPortHeight"
        :viewPortX="cfg.viewPortX"
        :viewPortY="cfg.viewPortY"
        :strokeWidth="strokeWidth"
        :canvasWidth="canvasWidth"
        :canvasHeight="canvasHeight"
        :rawPath="kDefaultPath"
        ></Canvas>
    </div>
    <Footer class=" absolute left-[calc(50%-80px)] bottom-0"></Footer>
  </div>
</template>
```

## 2.创建Canvas.vue组件 -- Svg格子画布 （子组件）

- 主要一个 svg 标签，和四个 line 标签。
 - 四个 line 分别代表着 x 轴、 y轴和 遍历出来的 平行于 x 轴 和 平行于 y 轴的直线
- 主要有几个值 viewPortX 、viewPortY 、viewPortWidth 、viewPortHeight、strokeWidth、canvasWidth、canvasHeight
- 对于 svg 标签，有一个变量 viewBox
- 对于 line 标签， 有四个变量 x1 、y1 、 x2 、y2

```html
<template>
  <svg
    width="100%"
    height="100%"
    :viewBox="viewPortX+' '+viewPortY+' '+viewPortWidth+' '+viewPortHeight"
    >
    <line
      :x1="props.viewPortX"
      y1="0"
      :x2="props.viewPortX + props.viewPortWidth"
      y2="0"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth * 4"
      />
    <line
      :x1="0"
      :y1="props.viewPortY"
      :x2="0"
      :y2="props.viewPortY + props.viewPortHeight"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth * 4"
      />
    <line
      v-for="item in xGrid"
      :x1="item"
      :y1="props.viewPortY"
      :x2="item"
      :y2="props.viewPortY + props.viewPortHeight"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth"
      />
    <line
      v-for="item in yGrid"
      :x1="props.viewPortX"
      :y1="item"
      :x2="props.viewPortX + props.viewPortWidth"
      :y2="item"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth"
      />

  </svg>
</template>
```

## 3. 子组件渲染 line
子组件 Canvas.vue 中的目的很明显，就是计算 line的数量渲染。
根据可视范围的宽高去计算有多少条直线渲染就完了。
```ts
const props = defineProps({
  viewPortX: { type: Number, default: 0 },
  viewPortY: { type: Number, default: 0 },
  viewPortWidth: { type: Number, default: 0 },
  viewPortHeight: { type: Number, default: 0 },
  strokeWidth: { type: Number, default: 1 },
  canvasWidth: { type: Number, default: 100 },
  canvasHeight: { type: Number, default: 100 },
})

const xGrid = ref()
const yGrid = ref()
watch(props,() => {
  if (5 * props.viewPortWidth <= props.canvasWidth) {
    xGrid.value = Array(Math.ceil(props.viewPortWidth) + 1).fill(null).map((_, i) => Math.floor(props.viewPortX) + i)
    yGrid.value = Array(Math.ceil(props.viewPortHeight) + 1).fill(null).map((_, i) => Math.floor(props.viewPortY) + i)
  } else {
    xGrid.value = []
    yGrid.value = []
  }
},{ immediate:true })
```

## 4.父组件中计算可视范围
- 初始化定义变量，画步默认尺寸为 100*100。
- 初始化关键变量，视图宽高、原点位置、线宽、获取canvas的dom及其要素变量
```ts
const canvasWidth = ref(100)
const canvasHeight = ref(100)
let cfg = reactive({
  viewPortX: 0,
  viewPortY: 0,
  viewPortWidth: 0,
  viewPortHeight: 0,
})
let strokeWidth = ref(0)

const canvas = ref(null)
const { width, height } = useElementBounding(canvas)
```
- 创建函数，更新这几个关键的视图值
```ts
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
  cfg.viewPortX = parseFloat((1 * x).toPrecision(6));
  cfg.viewPortY = parseFloat((1 * y).toPrecision(6));
  cfg.viewPortWidth = parseFloat((1 * w).toPrecision(4));
  cfg.viewPortHeight = parseFloat((1 * h).toPrecision(4));
  strokeWidth.value = cfg.viewPortWidth / canvasWidth.value;
}
```

## 5.关键的一步，初始化画布
- 根据一个svg，画布的格子尺寸刚好自适应这个svg
- 创建画布主要也是调用 updateViewPort() 去更改关键的视图变量，由于在子组件 Canvas.vue 中有监听，改变之后，会重新渲染 svg dom
```ts
/**
 * 初始化画布
 */
onMounted(() => {
  setTimeout(() => {
    zoomAuto();
  }, 0);
})
// 初始化默认的icon
const kDefaultPath = ref(
  `M 4 8 L 10 1 L 13 0 L 12 3 L 5 9 C 6 10 6 11 7 10 C 7 11 8 12 7 12 A 1.42 1.42 0 0 1 6 13 `
+ `A 5 5 0 0 0 4 10 Q 3.5 9.9 3.5 10.5 T 2 11.8 T 1.2 11 T 2.5 9.5 T 3 9 A 5 5 90 0 0 0 7 A 1.42 1.42 0 0 1 1 6 `
+ `C 1 5 2 6 3 6 C 2 7 3 7 4 8 M 10 1 L 10 3 L 12 3 L 10.2 2.8 L 10 1`
)
function zoomAuto() {
  const rawPath = kDefaultPath.value
  const bbox = browserComputePathBoundingBox(rawPath);
  const k = canvasHeight.value / canvasWidth.value;
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
```

## 6.窗口尺寸改变，自适应改变网格
- 前面有通过 useElementBounding() 方法获取 canvas dom 的尺寸
- 现在对其进行一个监听，调用 updateViewPort() 方法改变视图变量
```ts
watch([width, height], () => {
  canvasWidth.value = width.value
  canvasHeight.value = height.value

  updateViewPort(
    cfg.viewPortX,
    cfg.viewPortY,
    cfg.viewPortWidth,
    null,
    true
  )
})
```

## 7.滚轮放大缩小网格背景
- 对鼠标 wheel 进行监听， 这里直接使用了 vueuse 的 useEventListener()
- 根据 WheelEvent.deltaY -纵向滚动量，判断其缩放 scale 的 值
- 根据鼠标当前的点，判断其放大缩小的方向
- 调用 updateViewPort() 方法改变视图变量

```ts
/**
 * 滚轮放大缩小更新计算视图 ViewPort
 */
useEventListener(canvas, 'wheel', (evt: WheelEvent) => {
  const scale = Math.pow(1.005, evt.deltaY);
  const pt = eventToLocation(evt);

  zoomViewPort(scale, pt);
})

/**
 * 更新viewport
 */
function zoomViewPort(scale: number, pt?: { x: number, y: number }) {
  if (!pt) {
    pt = { x: cfg.viewPortX + 0.5 * cfg.viewPortWidth, y: cfg.viewPortY + 0.5 * cfg.viewPortHeight };
  }
  let x = cfg.viewPortX + ((pt.x - cfg.viewPortX) - scale * (pt.x - cfg.viewPortX));
  let y = cfg.viewPortY + ((pt.y - cfg.viewPortY) - scale * (pt.y - cfg.viewPortY));
  let w = scale * cfg.viewPortWidth;
  let h = scale * cfg.viewPortHeight;
  updateViewPort( x, y, w, h )
}

/** 鼠标事件触发的位置location */
function eventToLocation(event: MouseEvent | TouchEvent, idx = 0): { x: number, y: number } {
  const { top, left, } = useElementBounding(canvas)

  const touch = event instanceof MouseEvent ? event : event.touches[idx];
  const x = cfg.viewPortX + (touch.clientX - left.value) * strokeWidth.value;
  const y = cfg.viewPortY + (touch.clientY - top.value) * strokeWidth.value;

  return { x, y };
}
```

## 8.鼠标拖拽，自适应渲染网格背景
- 监听鼠标 mousedown 、 mousemove、 mouseup
- mousedown的时候开始调用拖拽方法，mouseup的时候停止调用拖拽方法
- 拖拽的时候，根据 mousedown （draggedEvt） 的坐标 -- oriPt和鼠标移动 mousemove （event） 的坐标 pt 计算当前偏移的坐标
- 得到新的坐标调用 updateViewPort() 方法改变视图变量
- 将 event 赋值给 draggedEvt。这样就可以流畅的拖拽了
```ts

/** 拖拽移动画布 canvas */
let draggedEvt: any = null
useEventListener(canvas, 'mousedown', (evt: MouseEvent) => {
  draggedEvt = evt
})
useEventListener(canvas, 'mouseup', (evt: MouseEvent) => {
  stopDrag()
})
useEventListener(canvas, 'mousemove', (evt: MouseEvent) => {
  drag(evt)
})
/** 鼠标事件触发的位置location */
function eventToLocation(event: MouseEvent | TouchEvent, idx = 0): { x: number, y: number } {
  const { top, left, } = useElementBounding(canvas)

  const touch = event instanceof MouseEvent ? event : event.touches[idx];
  const x = cfg.viewPortX + (touch.clientX - left.value) * strokeWidth.value;
  const y = cfg.viewPortY + (touch.clientY - top.value) * strokeWidth.value;

  return { x, y };
}

function drag(event: MouseEvent | TouchEvent) {
  if (draggedEvt) {

    const pt = eventToLocation(event);
    const pinchToZoomValue = pinchToZoom(draggedEvt, event)
    if (pinchToZoomValue !== null){
      const w = pinchToZoomValue.zoom * cfg.viewPortWidth;
      const h = pinchToZoomValue.zoom * cfg.viewPortHeight;
      const x = cfg.viewPortX + pinchToZoomValue.delta.x + (pinchToZoomValue.center.x - cfg.viewPortX) * (1 - pinchToZoomValue.zoom);
      const y = cfg.viewPortY + pinchToZoomValue.delta.y + (pinchToZoomValue.center.y - cfg.viewPortY) * (1 - pinchToZoomValue.zoom);

      updateViewPort( x, y, w, h )
    } else {
      const oriPt = eventToLocation(draggedEvt);
      let x = cfg.viewPortX + (oriPt.x - pt.x)
      let y = cfg.viewPortY + (oriPt.y - pt.y)
      let w = cfg.viewPortWidth
      let h = cfg.viewPortHeight

      updateViewPort( x, y, w, h )
    }
    draggedEvt = event;
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

function stopDrag() {
  draggedEvt = null;
}

```
