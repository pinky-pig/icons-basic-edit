export function initTimeline(props: any, context?: any) {
  let { isPlay } = toRefs(props)
  let {
    scrubberPositionLeft,
    scrubberAnimationState,
    scrubberAnimation,
  } = toRefs(context)

  const startPlay = () => {
    isPlay.value = true
    scrubberAnimation.value = 'scrubAnimation 5s linear infinite running'
    scrubberAnimationState.value = 'running'
  }
  const pausePlay = () => {
    isPlay.value = false
    scrubberAnimationState.value = 'paused'
  }
  const stopPlay = () => {
    if (isPlay.value) {
      // if 正在播放 $reSet
      isPlay.value = false
      scrubberAnimation.value = ''
    }
  }

  return {
    scrubberPositionLeft,
    scrubberAnimationState,
    scrubberAnimation,
    startPlay,
    pausePlay,
    stopPlay,
  }

}

export function dragKeyframeToTimelineBody(props: any, context?: any){

}
