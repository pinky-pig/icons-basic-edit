import { useComposition } from "./composititon"
import { StorageStore } from './storage.service'

export function initMatrix(props: any, context?: any){

  let { parsedPath } = toRefs(props)

  let { afterModelChange } = useComposition(props)

  // ?? null或undefined ; || 先转成 boolean
  const scale = (x: number, y: number) => {
    parsedPath.value.scale(1 * x || 1, 1 * y || 1);
    afterModelChange();
  }

  const translate = (x: number, y: number) => {
    parsedPath.value.translate(1 * x, 1 * y);
    afterModelChange();
  }

  watch(() => [props.scaleX, props.scaleY], (x1,x2) => {
    let x =  Number(x1[0] || 1) / ( Number(x2[0] || 1))
    let y =  Number(x1[1] || 1) / ( Number(x2[1] || 1))
    scale(x,y)
  })
  watch(() => [props.translateX,props.translateY], (x1,x2) => {
    let x =  Number(x1[0]) - Number(x2[0])
    let y =  Number(x1[1]) - Number(x2[1])
    translate(x,y)
  })


  return {

  }
}

const storage = new StorageStore()

export function initScreenshot(props: any, context?: any){
  let { rawPath,keyframeCursor } = toRefs(props)
  storage.addPath(keyframeCursor.value, rawPath.value)
  storage.setIsKeyframePathStatus(keyframeCursor.value, true)
}
