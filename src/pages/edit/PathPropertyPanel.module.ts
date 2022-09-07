import { useComposition } from "./composititon"

export function initMatrix(props: any, context?: any){

  let { parsedPath,scaleX,scaleY,translateX,translateY } = toRefs(props)

  let { afterModelChange } = useComposition(props)


  // ?? null或undefined ; || 先转成 boolean
  const scale = (x: number, y: number) => {
    parsedPath.value.scale(1 * x || 1, 1 * y || 1);
    afterModelChange();
  }

  const translate = (x: number, y: number) => {
    parsedPath.value.translate(1 * x, 1 * y);
    translateX.value = 0;
    translateY.value = 0;
    afterModelChange();
  }

  watch(() => [props.scaleX,props.scaleY], () => {
    scale(props.scaleX,props.scaleY)
  })
  watch(() => [props.translateX,props.translateY], () => {
    translate(props.translateX,props.translateY)
  })

  return {

  }
}
