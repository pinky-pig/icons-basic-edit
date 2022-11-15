import type { Ref } from 'vue'
import anime from 'animejs/lib/anime.js'
import type { stepsType } from '~/store/svg-animate'
// GSAP Timeline: https://greensock.com/docs/v3/GSAP/Timeline
// Anime Timeline: https://www.animejs.cn/documentation/#TLParamsInheritance

// isPlay 默认情况下是 stop , 点击播放是 running ， 暂停是 paused
// 按钮 Play 的状态是 show: isPlay == stop || isPlay == paused
// 按钮 Paused 的状态是 show: isPlay == running
// 按钮 Stop 的状态是 show: isPlay == running
// 针对于 canvas 面板 svg 显示
// stop: 显示 编辑（ path 和 point 和 line ） ，隐藏 原始的
// paused && running : 隐藏 编辑（ path 和 point 和 line ） ，显示原始的

// Anime.js 有个坑是不能 reset timeline 上的动画

export function initTimeline(props: any, context?: any) {
  const { isPlay, stepsData } = toRefs(props)
  const {
    scrubberPositionLeft,
    scrubberAnimationState,
    scrubberAnimation,
  } = toRefs(context)

  // 如果状态被改成 stop ， 停止动画
  watch(() => isPlay.value, (v1) => {
    if (v1 === 'stop')
      stopPlay()
  })

  let tl = anime.timeline({
    targets: '#galley_default',
    autoplay: false,
    direction: 'normal',
    loop: true,
  })

  const startPlay = () => {
    scrubberAnimation.value = 'scrubAnimation 5s linear infinite running'
    scrubberAnimationState.value = 'running'

    playAnime()
  }

  const pausePlay = () => {
    isPlay.value = 'paused'
    scrubberAnimationState.value = 'paused'
    tl.pause(true)
  }
  const stopPlay = () => {
    // if 正在播放 $reSet
    isPlay.value = 'stop'
    scrubberAnimation.value = ''

    tl.pause()
    tl.seek(0)
  }

  const playAnime = () => {
    if (isPlay.value === 'paused') {
      tl.play()
    }
    else {
      tl = anime.timeline({
        targets: '#galley_default',
        autoplay: false,
        direction: 'normal',
        loop: true,
      })

      stepsData.value?.forEach((i: stepsType, idx: number) => {
        // 默认第一个，所以 default 不需要添加动画
        if (idx === 0)
          return
        // 没有设置 targets ，是因为在初始化 timeline 的时候设置了，这里可以继承过来
        tl.add({
          d: {
            value: [
              stepsData.value[idx].values.path,
            ],
            duration: (i.animate_key - stepsData.value[idx - 1]?.animate_key || 0) * 50, // (i.animate_key - stepsData.value[idx - 1]?.animate_key || 0) * 5 / 100, // 整个时间轴的动画是 5s ，间隔两两相减
            easing: 'linear',
          },
          offset: 0,
          delay: 0,
        })
      })
      tl.play()
    }

    isPlay.value = 'running'
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

export function initMarkerContentDropMenu(props: any, context?: any) {
  const { stepsData } = toRefs(props)
  const { showDropdownRef, xRef, yRef } = toRefs(context)
  const current: Ref<stepsType | null> = ref(null)

  const handleMarkerContextMenu = (e: MouseEvent, item: stepsType) => {
    e.preventDefault()
    showDropdownRef.value = false
    nextTick().then(() => {
      showDropdownRef.value = true
      xRef.value = e.clientX
      yRef.value = e.clientY
      current.value = item
    })
  }

  const handleDeleteGallery = () => {
    if (current.value) {
      stepsData.value = stepsData.value.filter(it => it.animate_key !== (current.value as stepsType).animate_key)
      showDropdownRef.value = false
    }
  }

  return {
    handleMarkerContextMenu,
    handleDeleteGallery,
  }
}
