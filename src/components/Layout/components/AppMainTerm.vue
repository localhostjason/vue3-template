<template>
  <section class="app-main">
    <div class="app-main-div">
      <router-view :key='key'  v-slot='{ Component }'>
        <transition appear name='fade-transform' mode='out-in'>
          <keep-alive>
            <component :is='Component' />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </section>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => route.path)
</script>

<style scoped lang='scss'>
.app-main {
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow-x: hidden;

  .app-main-div {
    padding: 6px 20px;
  }
}
</style>
