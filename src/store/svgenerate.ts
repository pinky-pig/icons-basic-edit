import { acceptHMRUpdate, defineStore } from 'pinia'

interface SvgenerateType {
  /** 当前 svg */
  name:string,
  width:number,
  height:number,
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
      width:0,
      height:0,
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
    svgObj.width = options.width
    svgObj.height = options.height
    svgObj.property = options.property
  }

  function resetSvgenerateStore() {
    svgObj.name = ''
    svgObj.body = ''
    svgObj.width = 0
    svgObj.height = 0
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
