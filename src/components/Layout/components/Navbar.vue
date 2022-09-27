<template>
  <div class="navbar">
    <Hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"></Hamburger>

    <Breadcrumb class="breadcrumb-container"></Breadcrumb>

    <div class="right-menu">
      <screenfull id="screenfull" class="right-menu-item hover-effect"></screenfull>
      <!-- 退出登陆 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <p>{{ username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { SwitchButton } from '@element-plus/icons-vue'

import { defineComponent } from 'vue'
import Breadcrumb from '@/components/BreadCrumb'
import Hamburger from '@/components/HamBurger'
import Screenfull from '@/components/Screenfull/index.vue'
import { useMapGetters } from '../store'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { successMessage } from '@/utils/message'

export default defineComponent({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    let username = 'admin'

    // 退出登录
    const logout = (): void => {
      store.dispatch('user/removeUserInfo')
      router.push('/login')
      successMessage('退出登录成功')
    }

    return {
      // @ts-ignore
      ...useMapGetters(['sidebar']),
      toggleSideBar() {
        store.dispatch('app/toggleSideBar')
      },
      username,
      logout,
      SwitchButton
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
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
    padding: 3px 8px;
    font-size: 14px;
    color: #5a5e66;

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
    height: 48px;
    line-height: 48px;

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
      width: 80px;
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
</style>
