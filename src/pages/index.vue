<template>
  <n-config-provider :theme="naiveUIDarkTheme" :theme-overrides="naiveUIThemeOverrides">
    <div
      class="app-wrapper z-99 w-screen h-screen p-4 flex flex-col gap-8 bg-[var(--main-background-image)]"
    >
      <div class=" w-full h-full rounded-3xl gap-4 flex flex-row justify-between">
        <div class="w-350px h-full rounded-3xl bg-[var(--tool-bg-color)] text-[var(--tool-text-color)]">
          <ToolsPanel />
        </div>

        <div class="flex-1 h-full rounded-3xl bg-[var(--canvas-bg)] text-[var(--canvas-text)] overflow-hidden">
          <PathCanvas
            style="background-image: var(--canvas-bg-imgae);"
          />
        </div>
      </div>

      <Footer class=" absolute left-[calc(50%-80px)] bottom-0" />
    </div>
  </n-config-provider>
</template>

<style scoped>
.app-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  background-image: url("http://zhongguose.com/img/texture.png")
}
</style>

<route lang="yaml">
name: edit
meta:
  layout: home
  requiresAuth: false
  id: 3
  string: '3'
</route>
