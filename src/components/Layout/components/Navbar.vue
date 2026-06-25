<template>
  <div class='navbar'>
    <div class='navbar-logo' style='float: left'>
      <img src='@/assets/logo.png' class='hide_logo' alt='logo' />
      <span class='logo-text'>PAWMS</span>
    </div>

    <div class='nav-bar'>
      <ol class='header-nav'>
        <li class='header-nav-item ' :class="currentRouterModule === 'dash' ? 'item-active': ''" @click='switchDash'
            v-if='_dashRouters.length'>
          首页
        </li>
        <li class='header-nav-item ' :class="currentRouterModule === 'main' ? 'item-active': ''" @click='switchMain'
            v-if='_routers.length'>
          控制台
        </li>
      </ol>
    </div>

    <div class='right-menu'>

      <el-tooltip content='系统配置' effect='dark' v-if='_systemRouters.length'>
        <el-dropdown trigger='click' @command='handleCommand'>
          <div class='header-help'>
            <svg-icon icon-class='cog'></svg-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for='item in sysR' :key='item.name' :command='item.name'>{{ item.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-tooltip>

      <!-- 退出登陆 -->
      <el-dropdown trigger='click' size='default' style='margin-left: 8px; margin-right: 20px'>
        <div class='el-dropdown-link' style='color:#96a2b9;'>
          <div class='user-box'>
            <div class='nickname'>
              {{ nickname || username }}
            </div>

            <div class='username'>
              @{{ username }}
            </div>
          </div>
          <div>
            <CaretBottom style='height: 12px; position: relative; top: 2px'></CaretBottom>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu class='ttm'>
            <el-dropdown-item :icon='User' divided @click='userInfo'>个人信息</el-dropdown-item>
            <el-dropdown-item :icon='Lock' @click='changepwd'>修改密码</el-dropdown-item>
            <el-dropdown-item :icon='SwitchButton' divided @click='handlerLogout'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
</template>

<script setup lang='ts'>
import {
  CaretBottom,
  Lock,
  SwitchButton,
  User
} from '@element-plus/icons-vue'

import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { successMessage } from '@/utils/element/message'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRouterMStore } from '@/store/modules/router'

import SvgIcon from '@/components/SvgIcon/index.vue'
import { usePermissionStore } from '@/store/modules/permission'
import { getFieldFormArray } from '@/utils'
import { all } from 'axios'

const userStore = useUserStore()
const appStore = useAppStore()
const { sidebar, device } = storeToRefs(appStore)
const router = useRouter()

const username = userStore.username
const nickname = 'test'


const routerMStore = useRouterMStore()
const { currentRouterModule } = storeToRefs(routerMStore)

const permissionStore = usePermissionStore()
const { routers, systemRouters, dashRouters } = storeToRefs(permissionStore)

const filterRouters = (routes: any[]): any[] => {
  return routes
    .filter(route => route.hidden !== true)
    .map(route => ({
      ...route,
      children: route.children
        ? filterRouters(route.children)
        : []
    }))
}
const _routers = computed(() => {
  return filterRouters(routers.value)
})
const _systemRouters = computed(() => {
  return filterRouters(systemRouters.value)
})
const _dashRouters = computed(() => {
  return filterRouters(dashRouters.value)
})

const sysR = computed(() => {
  const childrenList = getFieldFormArray(_systemRouters.value, 'children')
  let out = []
  for (const children of childrenList) {
    for (const info of children) {
      out.push({
        title: info.meta.title,
        name: info.name
      })
    }
  }
  return out
})


const switchDash = () => {
  routerMStore.setCurrentRouterModule('dash')
  router.push({
    name: 'Dashboard'
  })
}

const switchMain = () => {
  routerMStore.setCurrentRouterModule('main')
  if (_routers.value.length > 0) {
    router.push({
      name: _routers.value[0].name
    })
  }
}


const handleCommand = (command: string) => {
  routerMStore.setCurrentRouterModule('system')
  router.push({
    name: command
  })
}


// 退出登录
const handlerLogout = async (): Promise<void> => {
  try {
    // todo api logout
    userStore.removeUserStore()
    await router.push('/login')
    successMessage('退出登录成功')
  } catch (e) {
  }
}

const userInfo = (): void => {
  router.push({
    name: 'UserInfo'
  })
}


const changepwd = () => {
  alert('todo')
}
</script>

<style lang='scss' scoped>
.navbar-logo {
  //@include backGround(#324157);
  background-color: rgb(24, 33, 50);
  width: 230px;
  height: 50px;
  padding: 0 10px;

  align-items: center;
  gap: 8px;
  line-height: 10px;

  .logo-text {
    color: #eaebf0;
    font-size: 22px !important;
    font-weight: 600;
    letter-spacing: 2px;
    font-family: "Inter", "Segoe UI", "Helvetica Neue", sans-serif;
  }

  span {
    //color: #ffffff;
    font-size: 16px;
    position: absolute;
    left: 65px;
    top: 21px;
  }

  .hide_logo {
    height: 36px;
    //color: #ffffff;
    margin-left: 10px;
    margin-top: 10px;
  }
}

.ttm {
  ::v-deep(.el-dropdown-menu__item--divided) {
    margin: 0 !important;
  }
}

.navbar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background: rgb(24, 33, 50);
  //box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .nav-bar {
    float: left;

    .header-nav {
      font-size: 14px;
      padding: 0;
      margin: 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      flex-flow: row nowrap;
      align-items: stretch;
      justify-content: flex-start;
    }

    .header-nav-item {
      margin-right: 10px;
      list-style: none;
      height: 50px;
      color: #96a2b9;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 4px solid transparent;
      padding: 0 22px;

      &:hover {
        cursor: pointer;
        border-bottom-color: #3a84ff;
        color: #fff;
      }

      &.item-active {
        border-bottom-color: #3a84ff;
        color: #fff;
      }
    }


  }


  .hamburger-container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu-item {
    display: inline-block;
    padding: 3px 15px;
    font-size: 14px;
    color: #5a5e66;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      width: 100%;
      background-color: #626aef;

      transform: scaleX(0);
      transform-origin: center bottom;
      transition: transform 0.25s ease;
    }

    &.is-active {
      color: #626aef;

      &::after {
        transform: scaleX(1);
      }
    }

    &.is-active {
      &::after {
        width: 100%;
      }

      color: #626aef;
    }

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .right-menu {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50px;

    .header-help {
      align-items: center;
      color: #768197;
      display: flex;
      font-size: 16px;
      height: 32px;
      justify-content: center;
      margin-right: 8px;
      position: relative;
      width: 32px;

      &:hover {
        background: linear-gradient(270deg, #253047, #263247);
        border-radius: 100%;
        color: #d3d9e4;
        cursor: pointer;
      }
    }

    .inter {
      width: 40px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      &:hover {
        cursor: pointer;
        background: #f0f0f0;
      }

      img {
        width: 25px;
      }
    }

    .hsset {
      width: 40px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 5px;

      &:hover {
        cursor: pointer;
        background: #f0f0f0;
      }
    }

    .el-dropdown-link {
      //width: 120px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 10px;
      cursor: pointer;

      p {
        font-size: 13px;
      }

      img {
        width: 22px;
        height: 22px;
      }
    }
  }
}

.el-dropdown-menu {
  padding: 0;
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #606266;
  background: #f0f0f0;
}

.user-box {
  padding: 0 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.2;

  .nickname {
    font-size: 12px;
    font-weight: 500;

    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .username {
    color: #7f8aa3;
    font-size: 11px;

    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
