import { defineStore } from 'pinia'

export const useSvgAnimate = defineStore({
  id: 'svgAnimate',
  state: () => {
    return {
      isPlay:false,
      gallery:[
        {
          key:0,
          values: ''
        }
      ],
      stepsData:[
        {
          key:0,
          values:'',
        }
      ]
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
