<template>
  <div class="flex flex-col w-full h-full">
    <!-- top -->
    <div class="top w-full h-14 flex flex-row items-center justify-between px-4">

      <!-- 播放按钮 -->
      <div class="text-[var(--animate-text-color)] flex flex-row gap-4">
        <button class="rounded-full">
          <div @click="startPlay" v-if="!props.isPlay" class=" w-8 h-8 cursor-pointer bg-green-400 animate-btn" i="carbon-play-outline" />
          <div @click="pausePlay" v-else class=" w-8 h-8 cursor-pointer bg-[#FDD352] animate-btn" i="carbon-pause-outline" />
        </button>

        <button :disabled="!props.isPlay" class="animate-btn rounded-full">
          <div @click="stopPlay" :class="!props.isPlay ? 'bg-[#E4E5EE30]' : 'bg-[#FF6168]'"  class=" w-8 h-8 cursor-pointer" i="carbon-stop-outline" />
        </button>
      </div>

      <!-- 操作按钮 -->

      <div class="mr-10 text-[var(--animate-text-color)] flex flex-row gap-4">
        <button class="rounded-full">
          <div class=" w-6 h-6 cursor-pointer bg-[#E4E5EE] animate-btn" i="carbon-trash-can" />
        </button>
      </div>


    </div>
    <!-- timeline -->

    <div class="w-full flex-1 px-5 min-h-100px">
      <div class="relative w-full h-full flex flex-row justify-center items-center  ">

        <!-- 时间轴范围 -->
        <div class="timelineTicks" >
          <div class="tick" v-for="i in 21" :key="i">
            <b>{{(i*5) - 5}}%</b>
          </div>
        </div>


        <!-- 播放线 -->
        <div class="scrubber" ref="scrubber" ></div>

        <!-- 时间轴body -->
        <div @drop="drop" @dragover="allowDrop" class="relative w-full h-70% mt-40px rounded-xl flex flex-row justify-between" >

          <!-- 100条线 -->
          <div v-if="props.isDraggingKeyframe" @dragenter="dragenter" @dragleave="dragleave" class="timelinePositions" >
            <button class="pos" :class="'pos_'+i" v-for="i in 101" :key="i"><b>{{i - 1}}</b></button>
          </div>

          <!-- Step Markers -->
          <div class="timeline-marker" v-for="(item, index) in props.stepsData" :style="'left: ' + (item.key - 1) + '%'">
            <n-popover trigger="hover">
              <template #trigger>
                <button>
                  <b>{{item.key - 1}}</b>
                </button>
              </template>
              <svg class=" w-8 h-8" stroke="currentColor" fill="currentColor">
                <path :d="item.values.path"></path>
              </svg>
            </n-popover>
          </div>

          <!-- 背景 -->
          <div v-for="i in 21" :key="i">
            <svg width="5" height="100%">
              <defs>
                <pattern id="rect" patternUnits="userSpaceOnUse" width="5" height="40">
                  <rect y="5" width="5" height="5" fill="currentColor" rx="5"></rect>
                </pattern>
              </defs>
              <rect id="canvas" width="5" height="100%" fill="url(#rect)" />
            </svg>
          </div>


        </div>
      </div>


    </div>
  </div>
</template>
<script setup lang="ts">
import { initTimeline } from './PathAnimatePanel.module'
import { useDragKeyframeToAnimate } from './composititon'

const props = useSvgAnimate()
const scrubberPositionLeft = ref('0')
const scrubberAnimationState = ref('')
const scrubberAnimation = ref('')
const {
  startPlay,
  pausePlay,
  stopPlay,
} = initTimeline(props,{
  scrubberPositionLeft,
  scrubberAnimationState,
  scrubberAnimation,
})

// 初始化拖拽方法
const {
  allowDrop,
  drop,
  dragenter,
  dragleave,
} = useDragKeyframeToAnimate(props)


const playGsap = () => {
  const gsap = window.gsap
  var tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.3,
    defaults: {
      duration: 1
    }
  })
  var circle = document.getElementById("mainSvg");
  tl.to(circle, {morphSVG:"#galley_0"}, "+=1")
  tl.to(circle, {morphSVG:"#galley_1"}, "+=1")
  tl.to(circle, {morphSVG:"#galley_2"}, "+=1")
  tl.to(circle, {morphSVG:"#galley_3"}, "+=1")
    .to(circle, {morphSVG: circle}, "+=1");
}


// CSS animation:
// animation-name -- 动画名字
// animation-duration -- 持续时间
// animation-timing-function -- 速度曲线（贝塞尔）： linear...
// animation-delay -- 延迟时间
// animation-iteration-count -- 播放次数 ：infinite...
// animation-direction -- 动画方向 ： normal/reverse/alternate...
// animation-fill-mode -- 动画不播放的时候，要应用到元素的样式 ：forwards(移动div从左到右，然后就停留在右)/backwards
// animation-play-state -- 动画是否暂停 ： paused/running

</script>

<style lang="less" scoped>
  // 按钮
  .top{
    box-shadow: 0 2px 15px 4px var(--box-shadow-color);
  }
  // 时间条
  .timelineTicks{
    @apply absolute w-full top-0 left-0 flex flex-row justify-between;
    .tick{
      height: 10px;
      width: 2px;
      font-size: 0.6em;
      position: relative;
      background: linear-gradient(360deg, currentColor, #00000000);

      b{
        position: absolute;
        width: 20px;
        text-align: center;
        left: 50%;
        bottom: -14px;
        margin-left: -10px;
        top: 15px;
      }

      &:nth-child(even){
        b{
          display: none;
        }
      }
    }
  }

  // 总共100个位置
  .timelinePositions{
    display: flex;
    position: absolute;
    z-index: 101;
    width: 100%;
    height: 90%;
    width: calc(100% + 10px);
    margin: 0 0px 5px -5px;

    .pos{
      margin: 0;
      padding: 0;
      flex-grow: 3;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: visible;
      margin-top: 1px;
      width: 8px;
      height: 100%;
      background-color: #22233E;
      opacity: 0;
      border-radius: calc(10 / 3);
      transition: 0s;

      b{
        position: absolute;
        left: 50%;
        top: 50%;
        background-color: #22233E;
        margin-left: -11px;
        margin-top: -11px;
        width: 22px;
        height: 22px;
        border-radius: calc(10 / 2);
        text-align: center;
        color: white;
        font-size: 0.8em;
        line-height: 22px;
        font-weight: 700;
        z-index: 102;
        overflow: visible;
        pointer-events: none;
      }

      &:hover,
      &:focus{
        cursor: copy;
        opacity: 1;
      }
    }

  }

  // 播放线
  .scrubber{
    width: 2px;
    height: 80%;
    background-color: #2767ce;
    margin-top: 25px;
    top: 0;
    left: v-bind(scrubberPositionLeft);
    border-radius: 5px;
    z-index: 100;
    margin-left: -2px;
    position: relative;
    cursor: pointer;
    animation: v-bind(scrubberAnimation);
    animation-play-state: v-bind(scrubberAnimationState);

    outline: 2px dotted transparent;
    outline-offset: -2px;
    transition: outline 0.12s ease, outline-offset 0.12s ease;

    &:hover{
      outline: 2.5px dashed var(--primary-color) !important;
      stroke-dashoffset: 12px;
      outline-offset: 2px;
      transition: outline 0.12s ease, outline-offset 0.12s ease;
    }

  }
  .scrubber::before{
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    left: -9px;
    background: #2767ce;
    -webkit-clip-path: polygon(50% 100%, 100% 38%, 81% 0, 19% 0, 0% 38%);
    clip-path: polygon(50% 100%, 100% 38%, 81% 0, 19% 0, 0% 38%);
  }


  .timeline-marker{
    width: 8px;
    height: 72%;
    background-color: green;
    position: absolute;
    top: 10px;
    left: 10%;
    border-radius: calc(10 / 3);
    z-index: 50;
    // box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    // transition: var(--transition);
    padding: 0;
    margin: 0 0 0 -4px;
    // font-family: var(--sans);

    b{
      background-color: red;
      margin-left: -7px;
      width: 22px;
      height: 22px;
      border-radius: calc(10 / 2);
      text-align: center;
      color: white;
      font-size: 0.7em;
      line-height: 22px;
      font-weight: 700;
    }

    &.active{
      background-color: orange;
      b{
        background-color: lightblue;
      }
    }

    &:hover{
      // height: 90%;
      // top: 5px;
      cursor: pointer;
    }
  }

</style>
<style>
  @keyframes scrubAnimation {
    0%{
      left: 0%;
    }
    100%{
      left: 100%;
    }
  }
</style>
