<script setup lang="ts">
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

function initMatrix(props: any, _context?: any) {
  const { parsedPath } = toRefs(props)

  const { afterModelChange } = useComposition(props)

  // ?? null或undefined ; || 先转成 boolean
  const scale = (x: number, y: number) => {
    parsedPath.value.scale(1 * x || 1, 1 * y || 1)
    afterModelChange()
  }

  const translate = (x: number, y: number) => {
    parsedPath.value.translate(1 * x, 1 * y)
    afterModelChange()
  }

  watch(() => [props.scaleX, props.scaleY], (x1, x2) => {
    const x = Number(x1[0] || 1) / (Number(x2[0] || 1))
    const y = Number(x1[1] || 1) / (Number(x2[1] || 1))
    scale(x, y)
  })
  watch(() => [props.translateX, props.translateY], (x1, x2) => {
    const x = Number(x1[0]) - Number(x2[0])
    const y = Number(x1[1]) - Number(x2[1])
    translate(x, y)
  })

  return {

  }
}
</script>

<template>
  <CCollapse>
    <template #title>
      PATH OPERATIONS
    </template>
    <template #default>
      <div class=" flex flex-col select-none">
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
      </div>
    </template>
  </CCollapse>
</template>

<style scoped>
.input-label{
  color: var(--input-text-color);
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  position: absolute;
  left: 10px;
  top: 5px;
}
</style>
