<script setup lang="ts">

</script>

<template>
  <section class="sidebar">
    <div class="sidebarTitle">
      <slot name="title" />
    </div>
    <div class="sidebarContent">
      <!-- <div class="card" /> -->
      <slot name="content" />
    </div>
    <div class="sidebarFooter">
      <slot name="footer" />
    </div>
  </section>
</template>

<style scoped>
.sidebar{
  font-family: 'DM Sans', sans-serif;
  min-width: 310px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #18171A;
  border: 1px solid #333038;
  border-radius: 8px;
  gap: 24px;
}

.sidebarTitle{
  color: #ffffff;
  font-size: 13px;
  margin: 0;
  padding: 16px;
  border-bottom: 1px solid #333038;
}

.sidebarContent{
  flex: 1 1 0%;
  padding: 0px 16px 0px 16px;
  gap: 14px;
  overflow: auto;
}

.card{
  display: flex;
  flex-direction: column;
  padding: 14px 16px 14px 16px;
  background-color: #242328;
  border: 1px solid #333038;
  border-radius: 8px;
  gap: 16px;
}

.sidebarFooter{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 24px 16px;
  border-top: 1px solid #333038;
  gap: 8px;
}
</style>
