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

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SidebarItem from './SidebarItem.vue'
import settings from '@/settings'

export default defineComponent({
  name: 'sidebar',
  components: {
    SidebarItem
  },
  setup() {
    // const router = useRouter().options.routes

    const store = useStore()

    const route = useRoute()

    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    const router = store.getters.permission_routers

    return {
      routes: router,
      activeMenu,
      isCollapse: computed(() => !store.getters.sidebar.opened),
      settings
    }
  }
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../../styles/mixin.scss';

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

<style rel="stylesheet/scss" lang="scss">
body {
  .router-link-active {
    .el-menu-item {
      color: rgb(64, 158, 255) !important;
    }
  }
}
</style>