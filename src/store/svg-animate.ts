import { defineStore } from 'pinia'
import { StoredPath } from '~/pages/edit/storage.service'

export interface stepsType {
  animate_key: number,
  values: StoredPath
}
export const useSvgAnimate = defineStore({
  id: 'svgAnimate',
  state: () => {
    return {
      isPlay: false,
      isDraggingKeyframe: false,
      stepsData: [] as stepsType[],
    }
  },
  getters: { },
  actions: {
    /** 重置状态 */
    resetSvgStore() {
      this.$reset()
    },
  },
})
