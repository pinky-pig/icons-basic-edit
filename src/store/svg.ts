import { defineStore } from 'pinia'

export const useSvgStore = defineStore({
  id: 'svg',
  state: () => {
    return {
      selectedSvgDom: null,
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
