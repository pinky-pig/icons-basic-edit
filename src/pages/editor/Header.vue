<template>
  <div
    class="header-container bg-transparent h-[10vh] flex-shrink-0 w-full flex flex-row justify-between items-center px-10">
    <div style="font-size:44px;font-family: fangsong;">Title</div>
    <div class=" flex flex-row gap-4 text-[var(--primary-text-color)]">

      <div
        class=" w-180px h-50px p-2 rounded-md grid grid-cols-2 divide-x bg-[var(--second-bg-color)] divide-[var(--primary-text-color)]">
        <div class="flex-center cursor-pointer">
          <svg style="font-size: 32px;" width="32" height="32" viewBox="0 0 256 256">
            <path fill="currentColor"
              d="M232 200a8 8 0 0 1-16 0a88.1 88.1 0 0 0-88-88H88v40a8 8 0 0 1-4.9 7.4a8.5 8.5 0 0 1-3.1.6a8.3 8.3 0 0 1-5.7-2.3l-48-48a8.1 8.1 0 0 1 0-11.4l48-48a8.4 8.4 0 0 1 8.8-1.7A8 8 0 0 1 88 56v40h40a104.2 104.2 0 0 1 104 104Z" />
          </svg>
        </div>
        <div class="flex-center cursor-pointer">
          <svg style="font-size: 32px;" width="32" height="32" viewBox="0 0 256 256">
            <path fill="currentColor"
              d="m232.5 112.5l-48 48a12.1 12.1 0 0 1-17 0a12 12 0 0 1 0-17L195 116h-67a84.1 84.1 0 0 0-84 84a12 12 0 0 1-24 0A108.1 108.1 0 0 1 128 92h67l-27.5-27.5a12 12 0 0 1 17-17l48 48a12 12 0 0 1 0 17Z" />
          </svg>
        </div>
      </div>

      <div class="flex-center cursor-pointer rounded-md w-90px h-50px bg-[var(--second-bg-color)] ">
        <div style="font-size: 32px;" i-carbon-overflow-menu-horizontal />
      </div>
    </div>
  </div>



</template>
<script setup lang="ts">

</script>

