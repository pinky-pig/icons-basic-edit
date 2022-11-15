<script setup lang="ts">
import { initMarkerContentDropMenu, initTimeline } from './PathAnimatePanel.module'
import { useDragKeyframeToAnimate } from './composititon'
import { symbolFn } from '~/utils/common'
const props = useSvgAnimate()
const scrubberPositionLeft = ref('0')
const scrubberAnimationState = ref('')
const scrubberAnimation = ref('')
const {
  startPlay,
  pausePlay,
  stopPlay,
} = initTimeline(props, {
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

// 初始化删除 marker
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const { handleMarkerContextMenu, handleDeleteGallery } = initMarkerContentDropMenu(props, { showDropdownRef, xRef, yRef })

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

<template>
  <div class="flex flex-col w-full h-full text-[var(--animate-bg-text-color)]">
    <!-- top -->
    <div class="top w-full h-14 flex flex-row items-center justify-between px-4">
      <!-- 播放按钮 -->
      <div class="text-[var(--animate-text-color)] flex flex-row gap-4">
        <button class="rounded-full">
          <div v-if="props.isPlay !== 'running'" class=" w-8 h-8 cursor-pointer bg-green-400 animate-btn" i="carbon-play-outline" @click="startPlay" />
          <div v-else class=" w-8 h-8 cursor-pointer bg-[#FDD352] animate-btn" i="carbon-pause-outline" @click="pausePlay" />
        </button>

        <button :disabled="props.isPlay === 'stop'" class="animate-btn rounded-full">
          <div :class="props.isPlay === 'stop' ? 'bg-[#E4E5EE30]' : 'bg-[#FF6168]'" class=" w-8 h-8 cursor-pointer" i="carbon-stop-outline" @click="stopPlay" />
        </button>
      </div>

      <!-- 操作按钮 -->
      <div class=" text-[var(--animate-text-color)] flex flex-row gap-4">
        <n-tooltip placement="top" trigger="hover">
          <template #trigger>
            <button class="rounded-full" @click="props.resetSvgStore()">
              <div class=" w-6 h-6 cursor-pointer bg-[#E4E5EE] animate-btn" i="carbon-trash-can" />
            </button>
          </template>
          <span> 清除 Timeline 上已添加的变形</span>
        </n-tooltip>
      </div>
    </div>

    <!-- timeline body -->
    <div class="w-full flex-1 px-5 min-h-100px">
      <div class="relative w-full h-full flex flex-row justify-center items-center  ">
        <!-- 时间轴范围 -->
        <div class="timelineTicks">
          <div v-for="i in 21" :key="i" class="tick">
            <b>{{ (i * 5) - 5 }}%</b>
          </div>
        </div>

        <!-- 播放线 -->
        <div ref="scrubber" class="scrubber" />

        <!-- 时间轴body -->
        <div class="relative w-full h-70% mt-40px rounded-xl flex flex-row justify-between" @drop="drop" @dragover="allowDrop">
          <!-- 100条线 -->
          <div v-if="props.isDraggingKeyframe" class="timelinePositions" @dragenter="dragenter" @dragleave="dragleave">
            <button v-for="i in 101" :key="i" class="pos" :class="`pos_${i - 1}`">
              <b>{{ i - 1 }}</b>
            </button>
          </div>

          <!-- Step Markers -->
          <div v-for="(item, index) in props.stepsData" :key="symbolFn(index)" class="timeline-marker" :style="`left: ${item.animate_key}%`">
            <n-popover trigger="hover">
              <template #trigger>
                <div class="w-full h-full" @contextmenu="v => handleMarkerContextMenu(v, item)">
                  <span>{{ item.animate_key }}</span>
                </div>
              </template>
              <svg class=" w-8 h-8" stroke="currentColor" fill="currentColor">
                <path :d="item.values.path" />
              </svg>
            </n-popover>
          </div>

          <!-- 背景 -->
          <div v-for="i in 21" :key="i">
            <svg width="5" height="100%">
              <defs>
                <pattern id="rect" patternUnits="userSpaceOnUse" width="5" height="40">
                  <rect y="5" width="5" height="5" fill="currentColor" rx="5" />
                </pattern>
              </defs>
              <rect width="5" height="100%" fill="url(#rect)" />
            </svg>
          </div>

          <!-- 右键删除 -->
          <ContentDropMenu
            v-model:showDropdownRef="showDropdownRef"
            :x="xRef"
            :y="yRef"
            @d="handleDeleteGallery"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  // 按钮
  .top{
    box-shadow: 0 2px 15px 4px var(--box-shadow-color);
  }
  // 时间条
  .timelineTicks{
    @apply absolute w-full top-0 left-0 flex flex-row justify-between select-none;
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
    height: 93%;
    border-radius: 10px;
    background-color: var(--animate-marker-bg-color);
    position: absolute;
    left: 10%;
    border-radius: calc(10 / 3);
    z-index: 50;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 0;
    margin: 0 0 0 -5px;

    span{
      background-color: var(--animate-marker-text-bg-color);
      width: 24px;
      height: 22px;
      border-radius: 5px;
      text-align: center;
      color: white;
      font-size: 0.7em;
      line-height: 22px;
      font-weight: 700;
      position: absolute;
      top: 40%;
      left: -8px;
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
