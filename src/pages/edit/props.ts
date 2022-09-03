import { SvgControlPoint, SvgPoint } from "./Svg"

export const kDefaultPath = ref(
  `M 4 8 L 10 1 L 13 0 L 12 3 L 5 9 C 6 10 6 11 7 10 C 7 11 8 12 7 12 A 1.42 1.42 0 0 1 6 13 `
+ `A 5 5 0 0 0 4 10 Q 3.5 9.9 3.5 10.5 T 2 11.8 T 1.2 11 T 2.5 9.5 T 3 9 A 5 5 90 0 0 0 7 A 1.42 1.42 0 0 1 1 6 `
+ `C 1 5 2 6 3 6 C 2 7 3 7 4 8 M 10 1 L 10 3 L 12 3 L 10.2 2.8 L 10 1`
)

export const canvasProps = () => ({
  canvasWidth: ref(100),
  canvasHeight: ref(100),
  cfg: reactive({
    viewPortX: 0,
    viewPortY: 0,
    viewPortWidth: 0,
    viewPortHeight: 0,
  }),
  strokeWidth: ref(0),
  parsedPath: ref(),
  rawPath: ref(kDefaultPath.value),
  draggedEvt: null,


  targetPoints: ref<SvgPoint[]>(),
  controlPoints: ref<SvgControlPoint[]>(),
  draggedPoint: ref(),
  focusedItem: ref(),
  hoveredItem: ref(),
})

