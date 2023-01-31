<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tagAndTagSpacing = 4 // tagAndTagSpacing

const left = ref<number>(0)
const scrollContainer = ref(null)

const scrollWrapper = computed(() => {
  return scrollContainer.value.wrap$
})

const handleScroll = e => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}

// todo
const moveToTarget = currentTag => {}

defineExpose({
  moveToTarget
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  ::v-deep(.el-scrollbar__bar) {
    bottom: 0;
  }

  ::v-deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>
