<template>
  <div class="dashboard-container">
    <div class="dash-panel">
      <dash-header></dash-header>
      <dash-body></dash-body>
      <dash-foot></dash-foot>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashHeader from './components/DashHeader.vue'
import DashBody from './components/DashBody.vue'
import DashFoot from './components/DashFoot.vue'
</script>

<style lang="scss" scoped>
@import './dash.scss';

.dashboard-container {
  padding: 0;
  background: #f6f8f9;
  height: 100%;
  margin: 0 -15px;

  .dash-panel {
    padding: 10px 20px 20px 20px;
  }
}
</style>
