export function initPath(props: any, context?: any){

  let { commandList,parsedPath } = toRefs(props)

  watch(() => parsedPath.value,() => {
    commandList.value = parsedPath.value.path
  })
}
