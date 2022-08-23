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
        :parsedPath="parsedPath"
        :targetPoints="targetPoints"
        :controlPoints="controlPoints"

        v-model:draggedPoint="draggedPoint"
        v-model:focusedItem="focusedItem"
        v-model:hoveredItem="hoveredItem"
        ></Canvas>
    </div>

    <Path>
      <!-- div contenteditable height = scrollHeight -->
      <textarea
        class="resize border rounded-md w-full h-[200px]"
        v-model="textareaValue"
        @blur="textareaBlur"
        @focus="textareafocus"
        ></textarea>
    </Path>

    <Command>
      <div class="h-[300px] overflow-auto cursor-default">
        <div class=" flex flex-row gap-2 mb-2 px-4 py-2 " v-for="item,index in commandList" >
          <div class="bg-orange-300 w-6">{{index}}</div>
          <div class=" max-w-4 w-4">{{item.getType()}}</div>
          <div class="w-6" v-for="value,idx in item.values" contenteditable>
            <!-- {{value}} -->
            <input
              type="text"
              class="w-full text-center"
              :value="value"
              @input="updateCommandValue(value, idx)"
              />
          </div>
        </div>
      </div>
    </Command>

    <Footer class=" absolute left-[calc(50%-80px)] bottom-0"></Footer>
  </div>
</template>
<script lang="ts" setup>
import { Point, Svg, SvgControlPoint, SvgPoint } from './Svg';

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
// 路径变量
const rawPath = ref(kDefaultPath.value)
// 经过 parse 的路径
const parsedPath = ref()
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
  // 计算当前鼠标的位置
  const pt = eventToLocation(event);
  // 这是触摸版缩放移动，暂不考虑
  const pinchToZoomValue = pinchToZoom(draggedEvt, event)
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
    draggedEvt = null;
  }else if (draggedEvt) {
    // 拖拽画布
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
  // 清除拖拽画布
  draggedEvt = null
  // 清除拖拽 dragPoint
  draggedPoint.value = null
  // 清除选中的高亮路径
  focusedItem.value = null
}


/** 拖拽移动控制点 points */
const targetPoints = ref<SvgPoint[]>()
const controlPoints = ref<SvgControlPoint[]>()
const draggedPoint = ref()
const focusedItem = ref()
const hoveredItem = ref()
onMounted(() => {
  setTimeout(() => {
    openPath(rawPath.value, '');
  }, 0);
})
function openPath(newPath: string, name: string): void {
  reloadPath(newPath, true);
}
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
/** 移动控制点后修改其位置 */
function afterModelChange(): void {
  reloadPoints();
  rawPath.value = parsedPath.value.asString(4, false);
}


/** textarea 双向绑定的值 */
let textEditFlag = false
const textareaValue = ref()
watch(() => rawPath.value,v1 => {
    textareaValue.value = v1
  },
  { immediate:true }
)
const textareafocus = () => {
  textEditFlag = true
}
const textareaBlur = () => {
  textEditFlag = false
}
watch(()=> textareaValue.value,()=>{
  if (textEditFlag) {
    reloadPath(textareaValue.value, false);
  }
})

/** command 列表 */
const commandList = ref()
watch(() => parsedPath.value,() => {
  commandList.value = parsedPath.value.path
})
const updateCommandValue = (v,index) => {
  commandList.value[index] = v
}
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
