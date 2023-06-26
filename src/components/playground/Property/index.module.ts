import type { Ref } from 'vue'
import type { StoredPath } from '~/logic/Storage'

export function initMatrix(props: any, _context?: any) {
  const { parsedPath } = toRefs(props)

  const { afterModelChange } = useComposition(props)

  // ?? null或undefined ; || 先转成 boolean
  const scale = (x: number, y: number) => {
    parsedPath.value.scale(1 * x || 1, 1 * y || 1)
    afterModelChange()
  }

  const translate = (x: number, y: number) => {
    parsedPath.value.translate(1 * x, 1 * y)
    afterModelChange()
  }

  watch(() => [props.scaleX, props.scaleY], (x1, x2) => {
    const x = Number(x1[0] || 1) / (Number(x2[0] || 1))
    const y = Number(x1[1] || 1) / (Number(x2[1] || 1))
    scale(x, y)
  })
  watch(() => [props.translateX, props.translateY], (x1, x2) => {
    const x = Number(x1[0]) - Number(x2[0])
    const y = Number(x1[1]) - Number(x2[1])
    translate(x, y)
  })

  return {

  }
}

export function initScreenshot(props: any, _context?: any) {
  const { rawPath, keyframeCursor, storage } = toRefs(props)
  keyframeCursor.value++
  storage.value.addPath(keyframeCursor.value, rawPath.value)
}

export function initContentDropMenu(props: any, context?: any) {
  const { storage, gallery } = toRefs(props)
  const { showDropdownRef, xRef, yRef } = toRefs(context)
  const current: Ref<StoredPath | null> = ref(null)

  const handleGalleryContextMenu = (e: MouseEvent, item: StoredPath) => {
    e.preventDefault()
    showDropdownRef.value = false
    if (item.name !== 'default' && item.name !== 'current') {
      nextTick().then(() => {
        showDropdownRef.value = true
        xRef.value = e.clientX
        yRef.value = e.clientY
        current.value = item
      })
    }
  }

  const handleDeleteGallery = () => {
    if (current.value) {
      storage.value.removePath(current.value.name)
      gallery.value = storage.value.storedPaths // 本来想直接在 pinia 中 ，computed storage.storedPaths to return to gallery ，但是没生效，所以手动了
      showDropdownRef.value = false
    }
  }

  return {
    handleGalleryContextMenu,
    handleDeleteGallery,
  }
}
