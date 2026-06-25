<template>
  <div
    v-if="!item.hidden && item.children && item.children.filter((v:any) => !v.hidden).length"
    class="menu-wrapper"
    :class="{ collapse: isCollapse }"
  >

    <!-- 一级标题：折叠时隐藏 -->
    <div class="menu-group-title" v-if="item.meta?.title && !isCollapse">
      <span>{{ item.meta?.title }}</span>
    </div>

    <!-- 二级菜单 -->
    <div class="menu-group-items">
      <template v-for="child in item.children.filter((v: any) => !v.hidden)" :key="child.path">

        <!-- 递归子菜单 -->
        <sidebar-item
          v-if="child.children && child.children.length"
          :item="child"
          :is-nest="true"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />

        <!-- 普通菜单 -->
        <router-link v-else :to="resolvePath(child.path)">
          <el-tooltip
            placement="right"
            :disabled="!isCollapse"
            :content="child.meta?.title"
          >
            <el-menu-item :index="resolvePath(child.path)" class="menu-item">
              <svg-icon v-if="child.meta?.icon" :icon-class="child.meta.icon" />

              <!--  文字在折叠时隐藏 -->
              <span v-show="!isCollapse">
                {{ child.meta?.title }}
              </span>
            </el-menu-item>
          </el-tooltip>
        </router-link>
      </template>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue'
import { AppRouteRecordRaw } from '@/router/types'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import path from 'path-browserify'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const appStore = useAppStore()
const { sidebar } = storeToRefs(appStore)
const isCollapse = computed(() => !sidebar.value.opened)

const onlyOneChild = ref<AppRouteRecordRaw>({} as any)

const resolvePath = (routePath: string) => {
  // const path = require('path')
  return path.resolve(props.basePath, routePath)
}

function hasOneShowingChild(children: AppRouteRecordRaw[] = []) {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  return showingChildren.length === 1
}
</script>

<style rel="" lang="scss" scoped>
.menu-wrapper {

  /* 一级标题 */
  .menu-group-title {
    font-size: 11px;
    font-weight: bold;
    color: rgb(107 114 128 / 87%);
    padding: 12px 20px 6px 20px;
  }

  .menu-group-items {
    .menu-item {
      padding-left: 40px !important;
      height: 38px;
      display: flex;
      align-items: center;

      svg {
        margin-right: 10px;
        font-size: 14px;
      }
    }
  }

  /* 折叠模式  */
  &.collapse {

    /* 隐藏一级标题 */
    .menu-group-title {
      display: none;
    }

    /* 图标居中、隐藏文字 */
    .menu-item {
      padding-left: 0 !important;
      justify-content: center;

      svg {
        margin-right: -16px;
      }

      span {
        display: none !important; /* 隐藏文字 */
      }
    }
  }
}


</style>
