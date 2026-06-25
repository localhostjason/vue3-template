<template>
  <div :class="classes" class="app-wrapper">
    <!-- 移动端侧边栏遮罩 -->
    <Hamburger
      v-if="device === 'mobile' && currentRouterModule !== 'dash' && !['UserInfo', 'TestCli'].includes(routerName as string)"
      :is-active="sidebar.opened" class="drawer-bg"
      @toggleClick="handleClickOutside"></Hamburger>

    <!-- 顶部导航 -->
    <Navbar />

    <div
      class="main-container"
      :class="['Dashboard', 'UserInfo', 'TestCli'].includes(routerName as string) ? 'dash' : 'transition'"
    >
      <!-- 侧边栏 -->
      <Sidebar />

      <!-- 主体内容 -->
      <AppMain />
    </div>


    <el-drawer v-model="drawer" direction="ltr" :with-header="false" size="230" style="position: fixed;top: 50px"
               body-class="lfdrawer-body">
      <LeftSidebar @closeDraw="closeDraw"></LeftSidebar>
    </el-drawer>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { useAppStore } from '@/store/modules/app'
import { Navbar, AppMain, Sidebar } from './components'
import Hamburger from '@/components/HamBurger'
import LeftSidebar from '@/components/Layout/components/sidebar/LeftSidebar.vue'
import { useRouterMStore } from '@/store/modules/router'
import { storeToRefs } from 'pinia'

// ---------------------------
// 常量
// ---------------------------
const WIDTH = 992

// ---------------------------
// Store & Route
// ---------------------------
const appStore = useAppStore()
const route = useRoute()

// ---------------------------
// 响应式计算属性
// ---------------------------
const sidebar = computed(() => appStore.sidebar)
const device = computed(() => appStore.device)

const classes = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile'
}))

const routerName = computed(() => route.name)

// ---------------------------
// 方法
// ---------------------------
// 判断是否移动端
const isMobile = () => document.body.getBoundingClientRect().width - 1 < WIDTH

// 窗口大小变化处理
const resizeHandler = () => {
  drawer.value = false
  if (!document.hidden) {
    const mobile = isMobile()
    appStore.toggleDevice(mobile ? 'mobile' : 'desktop')
    if (mobile) appStore.closeSideBar(true)
  }
}

// 点击遮罩关闭侧边栏
const drawer = ref<boolean>(false)
const handleClickOutside = () => {
  drawer.value = true
}
const closeDraw = () => {
  drawer.value = false // todo use store 传递
}


// ---------------------------
// 生命周期
// ---------------------------
onMounted(() => {
  // 初始判断是否移动端
  const mobile = isMobile()
  appStore.toggleDevice(mobile ? 'mobile' : 'desktop')
  if (mobile) appStore.closeSideBar(true)

  // 监听窗口变化
  useEventListener('resize', resizeHandler)
})

// 当移动端且侧边栏关闭时，保证状态同步
watchEffect(() => {
  if (device.value === 'mobile' && !sidebar.value.opened) {
    appStore.closeSideBar(false)
  }
})

const routerMStore = useRouterMStore()
const { currentRouterModule } = storeToRefs(routerMStore)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  position: absolute;
  float: left;
  height: 30px;
  line-height: 25px;
  margin: 8px;
  padding: 1px 8px !important;
  border-radius: 5px;
  border-color: #1ab394;
  background-color: #fff;
  cursor: pointer;
  -webkit-transition: .2s;
  transition: .2s;
  opacity: 1;
}


</style>
