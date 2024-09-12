<template>
  <section class="app-main" :class="name === 'Dashboard' ? 'dash' : ''" id="app-main">
    <el-scrollbar
      id="scrollbar"
      ref="scrollbarRef"
      wrap-style="overflow-x:hidden;"
      always
      @scroll="scroll"
      style="height: 100%"
    >
      <div style="padding: 0 15px">
        <router-view :key="key" v-slot="{ Component }">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>

    <el-backtop :right="5" :bottom="50" target=".app-main .el-scrollbar__wrap" />
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => route.path)
const name = computed(() => route.name)

// eslint-disable-next-line @typescript-eslint/no-empty-function
const scroll = (v: any) => {}
</script>

<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - 70px);
  width: 100%;
  height: 90vh;
  position: relative;
  overflow-x: hidden;

  &.dash {
    ::v-deep(.el-scrollbar__bar.is-horizontal) {
      height: 0 !important;
    }
  }
}
</style>
