import { acceptHMRUpdate, defineStore } from 'pinia'

interface SvgenerateType {
  /** 当前 svg */
  name:string,
  width:number,
  height:number,
  body:string,
  property:{
    size:number,
    stokeColor:string,
    stokeWidth:string,
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
        size:192,
        stokeColor:'',
        stokeWidth:'',
        fillColor:''
      }
    }
  )
  function setCurrentSvg(options:SvgenerateType) {
    svgObj.name = options.name
    svgObj.body = options.body
    svgObj.width = options.width
    svgObj.height = options.height
  }

  function resetSvgenerateStore() {
    svgObj.name = ''
    svgObj.body = ''
    svgObj.width = 0
    svgObj.height = 0
  }

  return {
    svgObj,
    setCurrentSvg,
    resetSvgenerateStore,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSvgenerateStore, import.meta.hot))
