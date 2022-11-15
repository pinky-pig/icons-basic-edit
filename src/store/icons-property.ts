import { defineStore } from 'pinia'

export const useSvgStore = defineStore({
  id: 'svg',
  state: () => {
    return {
      selectedSvgDom: null,
      /** 各种属性：stoke、fill等 */

      size: 192,
      stokeColor: '',
      stokeWidth: 1,
      fillColor: '',
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
