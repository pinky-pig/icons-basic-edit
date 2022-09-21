import { stepsType } from "~/store/svg-animate"
// GSAP Timeline: https://greensock.com/docs/v3/GSAP/Timeline

// isPlay 默认情况下是 stop , 点击播放是 running ， 暂停是 paused
// 按钮 Play 的状态是 show: isPlay == stop || isPlay == paused
// 按钮 Paused 的状态是 show: isPlay == running
// 按钮 Stop 的状态是 show: isPlay == running
// 针对于 canvas 面板 svg 显示
// stop: 显示 编辑（ path 和 point 和 line ） ，隐藏 原始的
// paused && running : 隐藏 编辑（ path 和 point 和 line ） ，显示原始的

export function initTimeline(props: any, context?: any) {
  let { isPlay,stepsData } = toRefs(props)
  let {
    scrubberPositionLeft,
    scrubberAnimationState,
    scrubberAnimation,
  } = toRefs(context)

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
    scrubberAnimation.value = 'scrubAnimation 5s linear infinite running'
    scrubberAnimationState.value = 'running'

    const galley_default = document.getElementById("galley_default")
    if (isPlay.value === 'paused') {
      tl.paused(!tl.paused())
    }else if(isPlay.value === 'stop'){
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
    isPlay.value = 'running'
  }

  const pausePlay = () => {
    isPlay.value = 'paused'
    scrubberAnimationState.value = 'paused'
    tl.paused(!tl.paused())
  }
  const stopPlay = () => {
    if (isPlay.value === 'running') {
      // if 正在播放 $reSet
      isPlay.value = 'stop'
      scrubberAnimation.value = ''
      tl.progress(0).clear(true)
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
