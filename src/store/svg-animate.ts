import { defineStore } from 'pinia'

export const useSvgAnimate = defineStore({
  id: 'svgAnimate',
  state: () => {
    return {
      isPlay:false
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
