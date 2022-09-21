import { stepsType } from "~/store/svg-animate"
import { StoredPath } from "./storage.service"

export function initTimeline(props: any, context?: any) {
  let { isPlay,stepsData } = toRefs(props)
  let {
    scrubberPositionLeft,
    scrubberAnimationState,
    scrubberAnimation,
  } = toRefs(context)


  // https://greensock.com/docs/v3/GSAP/Timeline
  const gsap = window.gsap
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: false,
    // repeatDelay: 0.3,
    defaults: {
      duration: 0
    },
    // onComplete:onComplete,
    // onRepeat:onRepeat,
  })


  const startPlay = () => {
    isPlay.value = true
    scrubberAnimation.value = 'scrubAnimation 5s linear infinite running'
    scrubberAnimationState.value = 'running'

    playGsapAnimation()
  }
  const pausePlay = () => {
    isPlay.value = false
    scrubberAnimationState.value = 'paused'
    tl.pause()
  }
  const stopPlay = () => {
    if (isPlay.value) {
      // if 正在播放 $reSet
      isPlay.value = false
      scrubberAnimation.value = ''
      tl.progress(0).clear(true)
    }
  }

  const playGsapAnimation = () => {
    const galley_default = document.getElementById("galley_default")
    // reset tl
    tl.progress(0).clear(true)
    stepsData.value?.forEach((i:stepsType,idx:number) => {
      console.log((i.animate_key - stepsData.value[idx - 1]?.animate_key || 0) * 5 / 100);
      tl.to(galley_default, {
        morphSVG:`#galley_${i.values.name}`,
        duration: (i.animate_key - stepsData.value[idx - 1]?.animate_key || 0) * 5 / 100, // 整个时间轴的动画是 5s ，间隔两两相减
        delay: 0,
      })
    })
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
