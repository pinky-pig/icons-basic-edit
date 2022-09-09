import { defineStore } from 'pinia'
import { SvgItem } from '~/pages/edit/Svg'
export const kDefaultPath = ref(
  `M 4 8 L 10 1 L 13 0 L 12 3 L 5 9 C 6 10 6 11 7 10 C 7 11 8 12 7 12 A 1.42 1.42 0 0 1 6 13 `
+ `A 5 5 0 0 0 4 10 Q 3.5 9.9 3.5 10.5 T 2 11.8 T 1.2 11 T 2.5 9.5 T 3 9 A 5 5 90 0 0 0 7 A 1.42 1.42 0 0 1 1 6 `
+ `C 1 5 2 6 3 6 C 2 7 3 7 4 8 M 10 1 L 10 3 L 12 3 L 10.2 2.8 L 10 1`
)

export const useSvgPathStore = defineStore({
  id: 'svgPathStore',
  state: () => {
    return {
      canvasWidth: 100 as number,
      canvasHeight: 100 as number,
      cfg: {
        viewPortX: 0 as number,
        viewPortY: 0 as number,
        viewPortWidth: 0 as number,
        viewPortHeight: 0 as number,
      },
      strokeWidth: 0 as number,
      parsedPath: undefined,
      rawPath: kDefaultPath.value,
      draggedEvt: null,


      targetPoints: [],
      controlPoints: [],
      draggedPoint: null as unknown as SvgItem,
      focusedItem: null as unknown as SvgItem,
      hoveredItem: null as unknown as SvgItem,

      commandList: [],
      textareaValue:'',

      draggedIsNew : false,

      // Undo/redo
      history: [] as string[],
      historyCursor : -1,
      historyDisabled : false,

      scaleX : 1,
      scaleY : 1,
      translateX : 0,
      translateY : 0,
      skewX : 0,
      skewY : 0,
      rotate : 0,
      transformOrigin:0,
    }
  },
  getters: {

  },
  actions: {
    /** 重置状态 */
    resetSvgStore() {
      this.$reset()
    },
  },
})
