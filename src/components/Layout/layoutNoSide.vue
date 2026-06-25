<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="main-container2">
      <NavbarNoSide />

      <!--      <tags-view></tags-view>-->
      <!-- 主体内容 -->
      <app-main-term />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NavbarNoSide, AppMainTerm } from './components'
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

body .main-container2 {
  min-height: 100%;
  transition: margin-left 0.28s;
  position: relative;
}
</style>
