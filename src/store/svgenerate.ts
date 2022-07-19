import { acceptHMRUpdate, defineStore } from 'pinia'

interface SvgenerateType {
  /** 当前 svg */
  name:string,
  body:string,
  /** svg的属性 */
  property:{
    stokeColor:string,
    stokeWidth:number,
    fillColor:string
  }
}
export const useSvgenerateStore = defineStore('svgenerate', () => {

  const svgObj : SvgenerateType = reactive(
    {
      name:'',
      body:'',
      property:{
        stokeColor:'',
        stokeWidth:0,
        fillColor:''
      }
    }
  )
  function setCurrentSvg(options:SvgenerateType) {
    svgObj.name = options.name
    svgObj.body = options.body
    svgObj.property = options.property
  }

  function resetSvgenerateStore() {
    svgObj.name = ''
    svgObj.body = ''
    svgObj.property = {
      stokeColor:'',
      stokeWidth:0,
      fillColor:''
    }
  }

  return {
    svgObj,
    setCurrentSvg,
    resetSvgenerateStore,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSvgenerateStore, import.meta.hot))
