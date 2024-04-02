<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import debounce from 'lodash/debounce'

// 防抖 ，针对echarts 优化

const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback: any) {
    callback = debounce(callback, 16)
    super(callback)
  }
}
</script>

<style lang="scss"></style>
