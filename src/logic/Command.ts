import { Point, SvgItem } from '~/logic/Svg'

export function initCommand() {
  const store = useSvgPathStore()

  const { afterModelChange } = useComposition(store)

  /** 属性面板编辑操作 */
  function setFocusedItemFromInput(item: SvgItem) {
    if (store.focusedItem)
      store.focusedItem = item
  }
  /** 删除 */
  function deleteFn(item: SvgItem) {
    store.focusedItem = null
    store.parsedPath!.delete(item)
    afterModelChange()
  }
  function canDelete(item: SvgItem): boolean {
    const idx = store.parsedPath!.path.indexOf(item)
    return idx > 0
  }
  /** 插入 */
  function insert(type: string, after: SvgItem | null, convert: boolean) {
    if (convert) {
      if (after) {
        store.focusedItem = (store.parsedPath as any).changeType(after, after.relative ? type.toLowerCase() : type)
        afterModelChange()
      }
    }
    else {
      store.draggedIsNew = true
      const pts = store.targetPoints
      let point1: Point

      let newItem: SvgItem | null = null
      if (after) {
        point1 = after.targetLocation()
      }
      else if (pts.length === 0) {
        newItem = SvgItem.Make(['M', '0', '0'])
        store.parsedPath!.insert(newItem)
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
          store.parsedPath!.insert(newItem, after ?? undefined)
      }
      setHistoryDisabled(true)
      afterModelChange()

      if (newItem) {
        store.focusedItem = newItem
        store.draggedPoint = newItem.targetLocation() as unknown as SvgItem
      }
    }
  }

  function setHistoryDisabled(value: boolean) {
    store.historyDisabled = value
    if (!value) {
    // pushHistory();
    }
  }

  function updateCommandValue(v, item: SvgItem, idx: number) {
    const val = Number(v.srcElement.value)
    if (!Number.isNaN(val)) {
      item.values[idx] = Number(val)
      store.parsedPath!.refreshAbsolutePositions()
      afterModelChange()
    }
  }

  return {
    setFocusedItemFromInput,
    deleteFn,
    canDelete,
    insert,
    setHistoryDisabled,
    updateCommandValue,
  }
}
