<script setup lang="ts">
import { initContentDropMenu, initMatrix, initScreenshot } from './PathPropertyPanel.module'

const props = useSvgPathStore()

// 初始化变形命令
initMatrix(props)
const transformType = reactive([
  {
    label: 'Scale',
    value: [
      computed({
        set(v) { props.scaleX = Number(v) },
        get() {
          return props.scaleX
        },
      }),
      computed({
        set(v) { props.scaleY = Number(v) },
        get() {
          return props.scaleY
        },
      }),
    ],
  },
  {
    label: 'Translate',
    value: [
      computed({
        set(v) { props.scaleX = Number(v) },
        get() {
          return props.translateX
        },
      }),
      computed({
        set(v) { props.scaleX = Number(v) },
        get() {
          return props.translateY
        },
      }),
    ],
  },
])

// 初始化拖拽

// 初始化右键菜单删除
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const { handleGalleryContextMenu, handleDeleteGallery } = initContentDropMenu(props, { showDropdownRef, xRef, yRef })

function updateKeySvgViewBox(path: string) {
  // 1.计算 svg 包含所有元素后的坐标
  const bbox = browserComputePathBoundingBox(path)
  const w = bbox.width + 2
  const h = bbox.height + 2

  return `${bbox.x - 1} ${bbox.y - 1} ${w} ${h}`
}
</script>

<template>
  <div class="w-full h-full flex flex-col select-none">
    <!-- All path data -->
    <div class=" flex flex-col items-start p-5 flex-grow-0 flex-shrink-0">
      <div class=" text-xl  tracking-widest">
        属性
      </div>
    </div>

    <!-- command -->
    <div class=" flex flex-col h-130px overflow-auto gap-3 flex-grow-0 flex-shrink-0">
      <div class=" flex flex-row tracking-widest px-5 ">
        Transform
      </div>

      <div v-for="(item, index) in transformType" :key="index" class="h-34px overflow-auto cursor-default px-3 mx-2 flex flex-row items-center gap-2">
        <div class="text-lg flex justify-center items-center rounded-lg w-1/3 h-full bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          {{ item.label }}
        </div>

        <div v-for="it, idx in item.value" :key="symbolFn(idx)" style="border-radius: 10px;" class=" relative flex-1 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <div class="input-label">
            {{ item.value.length === 1 ? ' ' : (idx === 0 ? 'x' : 'y') }}
          </div>
          <input
            v-model="transformType[index].value[idx].value"
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0  bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
          >
        </div>
      </div>
    </div>

    <!-- gallery -->
    <div class="w-full flex flex-col gap-3 px-5 py-2 flex-1 overflow-hidden">
      <button class="w-8 h-8 mb-2 flex-shrink-0 flex-grow-0" @click="initScreenshot(props)">
        <svg
          viewBox="0 0 1025 1024"
          class="w-8 h-8"
          style="fill: #fff;transform: rotate(315deg);"
        >
          <path d="M803.542 582.057a218.871 218.871 0 0 0-147.834 57.917L547.872 486.381 853.46 50.238a31.999 31.999 0 0 0-51.838-36.479L509.154 429.743 216.046 13.759a31.999 31.999 0 0 0-52.478 36.479l305.908 435.503L364.84 634.855a221.111 221.111 0 1 0 43.198 49.918l100.796-143.355L614.11 691.172a219.831 219.831 0 1 0 189.752-109.115zM221.805 958.042A156.154 156.154 0 1 1 377.96 802.208a156.154 156.154 0 0 1-156.154 155.834z m581.737 0a156.154 156.154 0 1 1 156.154-155.834 156.154 156.154 0 0 1-156.154 155.834z" />
        </svg>
      </button>

      <div class="flex-1 w-full gap-3 grid grid-cols-4 cursor-move overflow-auto">
        <div
          v-for="item in props.gallery"
          :key="symbolFn(item)"
          class="p-2 w-60px h-60px rounded-md bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
          @contextmenu="v => handleGalleryContextMenu(v, item)"
        >
          <svg
            :viewBox="updateKeySvgViewBox(item.path)"
            class=" w-full h-full"
            stroke="currentColor"
            fill="currentColor"
          >
            <path :d="item.path" />
          </svg>
        </div>
      </div>
    </div>

    <ContentDropMenu
      v-model:showDropdownRef="showDropdownRef"
      :x="xRef"
      :y="yRef"
      @d="handleDeleteGallery"
    />
  </div>
</template>

<style>
.input-label{
  color: var(--input-text-color);
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  position: absolute;
  left: 10px;
  top: 5px;
}
#draggable {
    width: 200px;
    height: 20px;
    text-align: center;
    background: white;
  }

  .dropzone {
    width: 200px;
    height: 20px;
    background: blueviolet;
    margin-bottom: 10px;
    padding: 10px;
  }
</style>
