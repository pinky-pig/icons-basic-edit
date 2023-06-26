import { Point, SvgItem } from '~/Svg'

export function initContextMenuCommand(props: any, _context?: any) {
  const {
    focusedItem,
    parsedPath,
    draggedIsNew,
    targetPoints,
    historyDisabled,
    draggedPoint,
  } = toRefs(props)
  const { afterModelChange } = useComposition(props)

  /** 属性面板编辑操作 */
  const setFocusedItemFromInput = (item: SvgItem) => {
    if (focusedItem)
      focusedItem.value = item
  }
  /** 删除 */
  const deleteFn = (item: SvgItem) => {
    focusedItem.value = null
    parsedPath.value.delete(item)
    afterModelChange()
  }
  const canDelete = (item: SvgItem): boolean => {
    const idx = parsedPath.value.path.indexOf(item)
    return idx > 0
  }
  /** 插入 */
  const insert = (type: string, after: SvgItem | null, convert: boolean) => {
    if (convert) {
      if (after) {
        focusedItem.value = parsedPath.value.changeType(after, after.relative ? type.toLowerCase() : type)
        afterModelChange()
      }
    }
    else {
      draggedIsNew.value = true
      const pts = targetPoints.value
      let point1: Point

      let newItem: SvgItem | null = null
      if (after) {
        point1 = after.targetLocation()
      }
      else if (pts.length === 0) {
        newItem = SvgItem.Make(['M', '0', '0'])
        parsedPath.value.insert(newItem)
        point1 = new Point(0, 0)
      }
      else {
        point1 = pts[pts.length - 1]
      }

      if (type.toLowerCase() !== 'm' || !newItem) {
        const relative = type.toLowerCase() === type
        const X = (relative ? 0 : point1.x).toString()
        const Y = (relative ? 0 : point1.y).toString()
        switch (type.toLocaleLowerCase()) {
          case 'm': case 'l': case 't':
            newItem = SvgItem.Make([type, X, Y])
            break
          case 'h':
            newItem = SvgItem.Make([type, X])
            break
          case 'v':
            newItem = SvgItem.Make([type, Y])
            break
          case 's': case 'q':
            newItem = SvgItem.Make([type, X, Y, X, Y])
            break
          case 'c':
            newItem = SvgItem.Make([type, X, Y, X, Y, X, Y])
            break
          case 'a':
            newItem = SvgItem.Make([type, '1', '1', '0', '0', '0', X, Y])
            break
          case 'z':
            newItem = SvgItem.Make([type])
        }
        if (newItem)
          parsedPath.value.insert(newItem, after ?? undefined)
      }
      setHistoryDisabled(true)
      afterModelChange()

      if (newItem) {
        focusedItem.value = newItem
        draggedPoint.value = newItem.targetLocation()
      }
    }
  }

  function setHistoryDisabled(value: boolean) {
    historyDisabled.value = value
    if (!value) {
      // pushHistory();
    }
  }

  const updateCommandValue = (v, item: SvgItem, idx: number) => {
    const val = Number(v.srcElement.value)
    if (!Number.isNaN(val)) {
      item.values[idx] = Number(val)
      parsedPath.value.refreshAbsolutePositions()
      afterModelChange()
    }
  }

  return {
    setFocusedItemFromInput,
    deleteFn,
    canDelete,
    updateCommandValue,
    insert,
  }
}
