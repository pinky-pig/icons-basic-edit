/**
 * Keyboard_event_code_values: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
 * useEventListener(target, 'keydown', (e: KeyboardEvent) => {
 *    updateRefs(e, true)
 *    return onEventFired(e)
 *  }, { passive })
 */

export type Fn = () => void

/** ctrl + z / ctrl + y */
export function undoFn(listener:Fn) {
  const { Ctrl_Z} = useMagicKeys()
  const stopWatch = watch(Ctrl_Z, (v) => {
    if (v)
      listener()
  })
  return stopWatch
}
export function redoFn(listener:Fn) {
  const { Ctrl_Y} = useMagicKeys()
  const stopWatch = watch(Ctrl_Y, (v) => {
    if (v)
      listener()
  })
  return stopWatch
}
