<template>
  <div ref="scrollContainer">
    <el-scrollbar ref="bar" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
      <slot />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'

const tagAndTagSpacing = 4 // tagAndTagSpacing

const left = ref<number>(0)
const scrollContainer = ref(null)
const bar = ref(null)

const scrollWrapper = computed(() => {
  return bar.value.wrapRef
})

const handleScroll = e => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}

// todo
const moveToTarget = currentTag => {
  const $container = scrollContainer.value
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = scrollWrapper.value
}

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
