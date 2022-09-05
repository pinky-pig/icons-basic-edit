
<script setup lang="ts">
// import { canvasProps } from './props'
import { initPath } from './PathToolsPanel.module'

const props = useSvgPathStore()

// 初始化变量
// const props = reactive(canvasProps())


// 初始化Path
initPath(props)


</script>

<template>
  <div class="w-full h-full flex flex-col gap-5">
    <!-- All path data -->
    <div class=" flex flex-col">
      <div class=" h-40px flex flex-row items-center gap-2">
        <div class="text-2xl" i="carbon-text-annotation-toggle " />
        <div class=" text-xl  tracking-widest"> Path </div>
      </div>

      <div>
        <textarea
          class="w-full p-2 resize rounded-2xl bg-[#2a2e31] text-[#a4a8ab] outline-none"
          name="" id="" cols="50" rows="5">
        </textarea>
      </div>
    </div>

    <!-- command -->
    <div class=" flex flex-col">
      <div class=" flex flex-row tracking-widest">
        Command
      </div>

      <div
        v-for=" in props.commandList"
        class=" flex-center gap-2 m-2 p-2 rounded-md hover:bg-[var(--panel-hover-bg-color)]"
        >

        6666

      </div>




    </div>

  </div>
</template>
