<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="sidebar-header">
      <Eleme :class="[!isCollapse ? 'show_log' : 'hide_log']" />
      <span v-show="!isCollapse">{{ settings.title }}</span>
    </div>

    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      unique-opened
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :collapse-transition="false"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import settings from '@/settings'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import { Eleme } from '@element-plus/icons-vue'

// const router = useRouter().options.routes
const permissionStore = usePermissionStore()
const appStore = useAppStore()

const { sidebar } = storeToRefs(appStore)
const { routers } = storeToRefs(permissionStore)

const route = useRoute()

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const isCollapse = computed(() => !sidebar.value.opened)
const routes = routers
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/mixin.scss';

.sidebar-container {
  .el-menu {
    height: calc(100% - 50px) !important;
  }
}

.show_log {
  width: 38px;
  height: 38px;
  color: #ffffff;
  margin-left: 10px;
}

.hide_log {
  width: 33px;
  height: 33px;
  color: #ffffff;
}

.sidebar-header {
  @include backGround(#324157);
  border-bottom: 1px solid #333;
  width: 100%;
  height: 50px;
  padding: 5px 10px;

  span {
    color: #ffffff;
    font-size: 20px;
    position: absolute;
    left: 75px;
    top: 13px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss"></style>
