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
      stepsData: [
        {
          animate_key:0,
          values:{
            name:'default',
            path: kDefaultPath.value,
            creationDate: new Date(),
            changeDate: new Date(),
          }
        },
        {
          animate_key:100,
          values:{
            name:'default',
            path: kDefaultPath.value,
            creationDate: new Date(),
            changeDate: new Date(),
          }
        }
      ] as stepsType[],
    }
  },
  getters: { },
  actions: {
    /** 重置状态 */
    resetSvgStore() {
      this.$reset()
    },

    /** 插入动画步骤数据 */
    addStepsData(obj:stepsType){
      this.stepsData.push(obj)
      this.stepsData.sort((a,b) => a.animate_key - b.animate_key )
    },
  },
})
