import { stepsType } from "~/store/svg-animate"
import { StoredPath } from "./storage.service"

export function initTimeline(props: any, context?: any) {
  let { isPlay,stepsData } = toRefs(props)
  let {
    scrubberPositionLeft,
    scrubberAnimationState,
    scrubberAnimation,
  } = toRefs(context)

  const startPlay = () => {
    isPlay.value = true
    scrubberAnimation.value = 'scrubAnimation 5s linear infinite running'
    scrubberAnimationState.value = 'running'

    playGsap()
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

  const playGsap = () => {
    const gsap = window.gsap
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.3,
      defaults: {
        duration: 1
      }
    })

    const mainSvg = document.getElementById("mainSvg")
    stepsData.value?.forEach((i:stepsType) => {
      tl.to(mainSvg, {morphSVG:`#galley_${i.values.name}`}, "+=1")
    })
    tl.to(mainSvg, {morphSVG: mainSvg}, "+=1")

    // tl.to(mainSvg, {morphSVG:"#galley_0"}, "+=1")
    // tl.to(mainSvg, {morphSVG:"#galley_1"}, "+=1")
    // tl.to(mainSvg, {morphSVG:"#galley_2"}, "+=1")
    // tl.to(mainSvg, {morphSVG:"#galley_3"}, "+=1")
    // tl.to(mainSvg, {morphSVG: mainSvg}, "+=1")
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
