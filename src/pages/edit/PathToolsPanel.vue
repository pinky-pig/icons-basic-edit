
<script setup lang="ts">
import { initPath } from './PathToolsPanel.module'
import { SvgItem } from './Svg';

const props = useSvgPathStore()

// 初始化Path
initPath(props)

/** 属性面板编辑操作 */
const setFocusedItemFromInput = (item:SvgItem) => {
  if (props.focusedItem) {
    props.focusedItem = item
  }
}
const deleteFn = (item:SvgItem) => {

}
const canDelete = (item:SvgItem) : boolean => {
  return false
}

const updateCommandValue = (v,item:SvgItem,idx:number) => {

}


/** textarea 双向绑定的值 */
let textEditFlag = false
const textareaValue = ref()
watch(() => props.rawPath,v1 => {
    textareaValue.value = v1
  },
  { immediate:true }
)
const textareaFocus = () => {
  textEditFlag = true
}
const textareaBlur = () => {
  textEditFlag = false
}
watch(()=> textareaValue.value,()=>{
  if (textEditFlag) {
  }
})


</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- All path data -->
    <div class=" flex flex-col p-5">
      <div class=" h-40px flex flex-row items-center gap-2">
        <div class="text-2xl" i="carbon-text-annotation-toggle " />
        <div class=" text-xl  tracking-widest"> Path </div>
      </div>

      <div>
        <textarea
          class="w-full max-w-full p-2 resize rounded-2xl bg-[#2a2e31] text-[#a4a8ab] outline-none"
          v-model="textareaValue"
          @blur="textareaBlur"
          @focus="textareaFocus"
          name="" id="" cols="50" rows="5">
        </textarea>
      </div>
    </div>

    <!-- command -->
    <div class=" flex flex-col flex-auto overflow-auto ">
      <div class=" flex flex-row tracking-widest px-5">
        Command
      </div>

      <div class="overflow-auto cursor-default px-3 mx-2">
        <div
          v-for="item in props.commandList"
          class=" flex-center gap-2 my-2 py-2 rounded-md hover:bg-[var(--panel-hover-bg-color)]"
          :style="{background:props.focusedItem == item ? 'var(--panel-button-active-bg-color)' : ''}"
          @click="setFocusedItemFromInput(item)"
          >

          <div class="flex-1 flex flex-row gap-1">
            <div class=" max-w-4 w-4 ">{{(item as any).getType()}}</div>
            <div class="w-8" v-for="value,idx in (item as any).values">
              <input
                type="text"
                style="font-size:10px;outline: none;"
                class="w-full text-center bg-[#2a2e31] border-0 focus:ring-0"
                :value="value"
                @input="v => updateCommandValue(v,item,idx)"
                />
            </div>
          </div>

          <CPopselect @delete="deleteFn(item)" :canDelete="canDelete(item)"></CPopselect>

        </div>


      </div>



    </div>

  </div>
</template>
