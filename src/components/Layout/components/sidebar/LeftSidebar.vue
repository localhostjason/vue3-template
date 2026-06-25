<template>
  <div style="display: grid;" v-show="currentRouterModule !== 'dash' && !['UserInfo'].includes(routerName as string)"
       class="sidebar-container left">

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        style="padding: 5px 0 0 0"
        :default-active="activeMenu"
        :collapse="isCollapse"
        unique-opened
        mode="vertical"
        :collapse-transition="false"
      >
        <SidebarItemV2 v-for="route in activeRoutes" :key="route.path" :item="route" @closeDraw="closeDraw"
                       :base-path="route.path"></SidebarItemV2>
      </el-menu>
    </el-scrollbar>
    <div class="nav-footer">
      <Hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"></Hamburger>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItemV2 from './SidebarItemV2.vue'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import { useRouterMStore } from '@/store/modules/router'
import Hamburger from '@/components/HamBurger'

const emit = defineEmits(['closeDraw'])
const closeDraw = () => {
  emit('closeDraw')
}

// const router = useRouter().options.routes
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const routerMStore = useRouterMStore()
const { currentRouterModule } = storeToRefs(routerMStore)

const { sidebar, device } = storeToRefs(appStore)
const { routers, systemRouters, dashRouters } = storeToRefs(permissionStore)

const route = useRoute()
const routerName = computed(() => route.name)

const toggleSideBar = () => {
  emit('closeDraw')
}

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const isCollapse = computed(() => !sidebar.value.opened)
const activeRoutes = computed(() => {
  switch (currentRouterModule.value) {
    case 'dash':
      return dashRouters.value || []
    case 'main':
      return routers.value || []
    case 'system':
      return systemRouters.value || []
    default:
      console.warn(`未知模块: ${currentRouterModule.value} - ${route.path}`)
      return routers.value || []
  }
})

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/mixin.scss';

.hamburger-container {
  line-height: 38px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.nav-footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  border-top: 1px solid rgba(31, 35, 41, .15);
  border-right: 1px solid rgba(31, 35, 41, .15);
  background-color: var(--submenu-bg);
}

.sidebar-container {
  .el-menu {
    height: calc(100vh - 89px) !important;
    overflow-x: auto;

    &::-webkit-scrollbar-track-piece {
      background: #ffffff;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #dddee0;
      border-radius: inherit;
      cursor: pointer;
      display: block;
      height: 0;
      opacity: var(--el-scrollbar-opacity, .3);
      position: relative;
      transition: var(--el-transition-duration) background-color;
      width: 0;
    }
  }
}

</style>

<style rel="stylesheet/scss" lang="scss">
body {

  .router-link-active .el-menu-item.is-active {
    position: relative;
    background-color: #ecf5ff;
    color: #409eff !important;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .router-link-active .el-menu-item.is-active::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background-color: #3a84ff;
    border-radius: 2px;
    animation: menu-active-slide 0.25s ease-out;
  }

  @keyframes menu-active-slide {
    from {
      transform: scaleY(0.6);
      opacity: 0;
    }
    to {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  .el-sub-menu__title:hover {
    border-radius: 10px;
  }
}
</style>
