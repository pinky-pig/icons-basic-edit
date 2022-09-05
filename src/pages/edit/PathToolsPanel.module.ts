import { useComposition } from './composititon'
import { SvgItem } from './Svg'

export function initPath(props: any, context?: any){

  let { commandList,parsedPath } = toRefs(props)
  watch(() => parsedPath.value,() => {
    commandList.value = parsedPath.value.path
  })

  // 双向绑定的值和视图,focusedItem判断是视图更改还是文本更改
  watch(() => props.rawPath, (v1) => {
    let { focusedItem } = toRefs(props)
    if (!focusedItem.value) {
      let { reloadPath } = useComposition(props)
      reloadPath(v1)
    }
  })

}

export function initCommand(props: any, context?: any){
  let { focusedItem,parsedPath } = toRefs(props)
  let { afterModelChange } = useComposition(props)


  /** 属性面板编辑操作 */
  const setFocusedItemFromInput = (item:SvgItem) => {
    if (focusedItem) {
      focusedItem.value = item
    }
  }
  /** 删除 */
  const deleteFn = (item:SvgItem) => {
    focusedItem.value = null;
    parsedPath.value.delete(item);
    afterModelChange();
  }
  const canDelete = (item:SvgItem) : boolean => {
    const idx = parsedPath.value.path.indexOf(item);
    return idx > 0;
  }

  const updateCommandValue = (v,item:SvgItem,idx:number) => {
    let val = Number(v.srcElement.value)
    if (!isNaN(val) ) {
      item.values[idx] = Number(val)
      parsedPath.value.refreshAbsolutePositions()
      afterModelChange();
    }
  }

  return {
    setFocusedItemFromInput,
    deleteFn,
    canDelete,
    updateCommandValue,
  }
}

