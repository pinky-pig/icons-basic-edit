<template>
  <div class="w-full h-full flex flex-col">
    <!-- All path data -->
    <div class=" flex flex-col items-start p-5">
      <div class=" text-xl  tracking-widest"> 属性 </div>
    </div>

    <!-- command -->
    <div class=" flex flex-col h-130px overflow-auto gap-3">
      <div class=" flex flex-row tracking-widest px-5 ">
        Transform
      </div>

      <div v-for="(item, index) in transformType" :key="index" class="h-34px overflow-auto cursor-default px-3 mx-2 flex flex-row items-center gap-2">
        <div class="text-lg flex justify-center items-center rounded-lg w-1/3 h-full bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          {{item.label}}
        </div>

        <div v-for="it,idx in item.value" style="border-radius: 10px;" class=" relative flex-1 h-full pl-8 pr-4 bg-[var(--input-bg-color)] text-[var(--input-text-color)] overflow-hidden">
          <div class="input-label">{{ item.value.length === 1 ? ' ' : ( idx === 0 ? 'x' : 'y') }}</div>
          <input
            type="text"
            style="font-size:18px;outline: none;"
            class=" w-full h-full border-0  bg-[var(--input-bg-color)] text-[var(--input-text-color)]"
            v-model="transformType[index]['value'][idx].value"
            />
        </div>
      </div>

    </div>

    <!-- gallery -->
    <div class="w-full flex flex-col gap-3 px-5">

      <button class="w-8 h-8" @click="initScreenshot(props)">
        <div class="w-8 h-8" i-carbon-screen> </div>
      </button>

      <div class="w-full gap-3 grid grid-cols-4">
        <div
          @contextmenu="v => handleGalleryContextMenu(v,item)"
          @dragstart="v => dragStartKeyframe(v,item)"
          draggable="true"
          v-for="item in props.gallery"
          class="p-2 w-60px h-60px rounded-md bg-[var(--input-bg-color)] text-[var(--input-text-color)]" >
          <svg
            :viewBox="updateKeySvgViewBox(item.path)"
            class=" w-full h-full"
            stroke="currentColor"
            fill="currentColor"
            >
            <path :d="item.path"></path>
          </svg>
        </div>

      </div>
    </div>

    <ContentDropMenu
      :x="xRef"
      :y="yRef"
      v-model:showDropdownRef="showDropdownRef"
      @d="handleDeleteGallery"
      ></ContentDropMenu>

  </div>
</template>

<script setup lang="ts">
import { initMatrix,initScreenshot,initContentDropMenu } from './PathPropertyPanel.module';
import { useDragKeyframeToAnimate } from './composititon'
import { browserComputePathBoundingBox } from './PathCanvas.help';
const props = useSvgPathStore()

// 初始化变形命令
initMatrix(props)
const transformType = reactive([
  { label:'Scale', value:[
    computed({ set(v){ props.scaleX = Number(v)}, get(){ return props.scaleX } }),
    computed({ set(v){ props.scaleY = Number(v)}, get(){ return props.scaleY } })
  ]},
  { label:'Translate', value:[
    computed({ set(v){ props.scaleX = Number(v) }, get(){ return props.translateX } }),
    computed({ set(v){ props.scaleX = Number(v) }, get(){ return props.translateY } }),
  ]},
])

// 初始化拖拽
const store = useSvgAnimate()
const { dragStartKeyframe } = useDragKeyframeToAnimate(store)

// 初始化右键菜单删除
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
let { handleGalleryContextMenu,handleDeleteGallery } = initContentDropMenu(props,{showDropdownRef,xRef,yRef})

const updateKeySvgViewBox = (path:string) => {
  // 1.计算 svg 包含所有元素后的坐标
  const bbox = browserComputePathBoundingBox(path);
  let w = bbox.width + 2;
  let h = bbox.height + 2;

  return `${bbox.x - 1} ${bbox.y - 1} ${w} ${h}`
}
</script>
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
