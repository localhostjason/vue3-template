<template>
  <section class="app-main" :class="name === 'Dashboard' ? 'dash' : ''" id="app-main">
    <el-scrollbar
      id="scrollbar"
      ref="scrollbarRef"
      wrap-style="overflow-x:hidden;"
      always
      @scroll="scroll"
      style="height: 100%;"
    >

      <div class="content">
        <div class="monitor-loading" style="background-color: rgba(255, 255, 255, 1); " v-show="loading">
          <div class="monitor-loading-spinner"><span class="loading-pointer pointer-1"></span><span
            class="loading-pointer pointer-2"></span><span class="loading-pointer pointer-3"></span><span
            class="loading-pointer pointer-4"></span></div>
        </div>
        <div class="content-body">
          <router-view :key="key" v-slot="{ Component }">
            <transition appear name="fade-transform" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </el-scrollbar>

    <el-backtop :right="5" :bottom="50" target=".app-main .el-scrollbar__wrap" />
  </section>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDashStore } from '@/store/modules/dash'
import { ElScrollbar } from 'element-plus'
import { useRouterMStore } from '@/store/modules/router'
import { storeToRefs } from 'pinia'

const route = useRoute()
const key = computed(() => route.path)
const name = computed(() => route.name)

const loading = ref(false)
const routerMStore = useRouterMStore()
const { currentRouterModule } = storeToRefs(routerMStore)
// 监听路由变化
watch(
  () => currentRouterModule.value,
  async () => {
    loading.value = true

    // 等待 DOM 更新 + 过渡动画
    await nextTick()

    // 你可以延迟一点让动画更自然
    setTimeout(() => {
      loading.value = false
    }, 500)
  },
  { immediate: true }
)

// eslint-disable-next-line @typescript-eslint/no-empty-function
const scroll = (v: any) => {
}

const dashStore = useDashStore()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
watch(
  () => dashStore.scrollTop,
  (value: any) => {
    if (value) {
      scrollbarRef.value!.setScrollTop(value)
      dashStore.setScrollTop(undefined)
    }
  }
)
</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 50px);
  width: 100%;
  //height: 90vh;
  position: relative;
  overflow-x: hidden;

  &.dash {
    ::v-deep(.el-scrollbar__bar.is-horizontal) {
      height: 0 !important;
    }

    .content {
      padding: 12px 0 10px 0 !important;

      .content-body {
        background: none !important;
      }
    }


  }

  .content {
    padding: 20px;

    .content-body {
      padding: 5px 20px 20px 20px;
      background: #FFFFFF;
    }

  }

  //&.dash {
  //  height: calc(100vh - 60px);
  //}
}
</style>

<style lang="scss" scoped>
// loading 特效
.monitor-loading {
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 4px;
  position: absolute;
  right: 4px;
  top: 0;
  transition: opacity .3s;
  z-index: 900;
}

.monitor-loading-spinner {
  align-items: center;
  display: flex;
}

.monitor-loading-spinner .loading-pointer {
  animation-direction: normal;
  animation-duration: .8s;
  animation-iteration-count: infinite;
  animation-name: scale-animate;
  border-radius: 100%;
  height: 14px;
  margin-right: 6px;
  transform: scale(.6);
  width: 14px;
}


@keyframes scale-animate {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.monitor-loading-spinner .loading-pointer.pointer-1 {
  animation-delay: .25s;
  background-color: #fd6154;
}

.monitor-loading-spinner .loading-pointer.pointer-2 {
  animation-delay: .4s;
  background-color: #ffb726;
}

.monitor-loading-spinner .loading-pointer.pointer-3 {
  animation-delay: .55s;
  background-color: #4cd084;
}

.monitor-loading-spinner .loading-pointer.pointer-4 {
  animation-delay: .7s;
  background-color: #57a3f1;
}
</style>
