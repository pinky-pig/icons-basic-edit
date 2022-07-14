import { acceptHMRUpdate, defineStore } from 'pinia'

interface SvgenerateType {
  /** 当前 svg */
  name:string,
  /** svg的属性 */
  property:{
    stokeColor:string,
    stokeWidth:number,
    fillColor:string
  }
}
export const useSvgenerateStore = defineStore('svgenerate', () => {


  const name = ref('')
  let property = ref(
    {
      stokeColor:'',
      stokeWidth:0,
      fillColor:''
    }
  )

  function setCurrentSvg(options:SvgenerateType) {
    name.value = options.name
    property.value = options.property
  }

  function resetSvgenerateStore() {
    name.value = ''
    property.value = {
      stokeColor:'',
      stokeWidth:0,
      fillColor:''
    }
  }

  return {
    name,
    property,
    setCurrentSvg,
    resetSvgenerateStore,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSvgenerateStore, import.meta.hot))
