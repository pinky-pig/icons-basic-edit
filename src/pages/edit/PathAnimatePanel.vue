<template>
  <div class="flex flex-col w-full h-full">
    <!-- top -->
    <div class="top w-full h-14 flex flex-row items-center justify-between px-4">

      <!-- 播放按钮 -->
      <div class="text-[var(--animate-text-color)] flex flex-row gap-4">
        <button class="rounded-full">
          <div @click="startPlay" v-if="!store.isPlay" class=" w-8 h-8 cursor-pointer bg-green-400 animate-btn" i="carbon-play-outline" />
          <div @click="pausePlay" v-else class=" w-8 h-8 cursor-pointer bg-[#FDD352] animate-btn" i="carbon-pause-outline" />
        </button>

        <button :disabled="!store.isPlay" class="animate-btn rounded-full">
          <div @click="stopPlay" :class="!store.isPlay ? 'bg-[#E4E5EE30]' : 'bg-[#FF6168]'"  class=" w-8 h-8 cursor-pointer" i="carbon-stop-outline" />
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

        <!-- <svg width="50" height="300" viewbox="0 0 100 500">
          <path fill="#2767ce" stroke="#2767ce" d="M 50 100 L 100 38 L 81 0 L 19 0 L 0 38 z"></path>
          <rect fill="#2767ce" stroke="#2767ce" x="48" y="98" width="4" height="400"></rect>
        </svg> -->

        <!-- 时间轴body -->
        <div ref="timelineBody" class="relative w-full h-70% mt-40px rounded-xl flex flex-row justify-between" >

          <!-- 当前轴线 -->
          <!-- <div class="timelinePositions" >
            <button class="pos" v-for="i in 101" :key="i"><b>{{i - 1}}</b></button>
          </div> -->

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

const store = useSvgAnimate()

const startPlay = () => {
  store.isPlay = true
}
const pausePlay = () => {
  store.isPlay = false
}
const stopPlay = () => {
  if (store.isPlay) {
    // 正在播放
    store.isPlay = false
  }
}

const timelineBody = ref(null)

const { elementX, elementY, isOutside } = useMouseInElement(timelineBody)

watch(()=>[elementX.value,elementY.value],()=>{
  if (!isOutside.value && isDraging) {
    scrubberPositionLeft.value = elementX.value + 'px'
  }
})

const scrubberPositionLeft = ref('0')
let isDraging = false

const startDragScrubber = () => {
  isDraging = true
}

const stopDragScrubber = () => {
  isDraging = false
}

const scrubber = ref(null)
useEventListener(scrubber, 'mousedown', (evt: MouseEvent) => {
  startDragScrubber()
})
useEventListener(timelineBody, 'mouseup', (evt: MouseEvent) => {
  stopDragScrubber()
})
useEventListener(scrubber, 'mousemove', (evt: MouseEvent) => {
  // drag(evt)
})
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

      b{
        position: absolute;
        width: 20px;
        text-align: center;
        left: 50%;
        bottom: -14px;
        margin-left: -10px;
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
    width: calc(100% - 22px);
    margin: 0 11px 5px 11px;

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
    // animation: scrubAnimation 5s linear 1s infinite running;

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
  @keyframes scrubAnimation {
    0%{
      left: 0%;
    }
    100%{
      left: 100%;
    }
  }
</style>
