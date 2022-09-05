<template>
<n-config-provider :theme="naiveUIDarkTheme">

  <div
    class="z-99 w-screen h-screen p-4 flex flex-col gap-4 bg-[#302f34]"
    >
    <div class=" w-full h-4/5 rounded-3xl gap-4 flex flex-row justify-between">
      <div class="w-350px h-full rounded-3xl bg-[#191d20]">
        <PathToolsPanel></PathToolsPanel>
      </div>

      <div class="flex-1 h-full rounded-3xl bg-[#0f0f11] overflow-hidden" >
        <PathCanvas></PathCanvas>
      </div>

    </div>

    <div class=" w-full flex-1 rounded-3xl bg-[#191d20]">

    </div>

  </div>
</n-config-provider>

</template>
<script setup lang="ts">
import PathCanvas from "./PathCanvas.vue";
import PathToolsPanel from "./PathToolsPanel.vue";


</script>

<route lang="yaml">
  name: edit
  meta:
    layout: home
    requiresAuth: false
    id: 3
    string: "3"
  </route>

