<template>
  <div class="dash-header">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div>
            <span class="fs-14">活跃用户</span>
            <p>
              <span>{{ formatPrice(state.user_total) }}</span>
            </p>
            <div class="right-icon">
              <svg-icon icon-class="person"></svg-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div>
            <span class="fs-14">订单</span>
            <p>
              <span>{{ formatPrice(state.charac_total) }}</span>
            </p>
            <div class="right-icon">
              <svg-icon icon-class="nested"></svg-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div>
            <span class="fs-14">总销量</span>
            <p>
              <span>{{ formatPrice(state.cera_total) }}</span>
            </p>
            <div class="right-icon">
              <svg-icon icon-class="dollar" class-name="rela"></svg-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="hover">
          <div>
            <span class="fs-14">总成交</span>
            <p>
              <span>{{ formatPrice(state.cera_point_total) }}</span>
            </p>
            <div class="right-icon">
              <svg-icon icon-class="yen" class-name="rela"></svg-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '@/utils'
import { reactive } from 'vue'

const state = reactive({
  user_total: 0,
  charac_total: 0,
  cera_point_total: 0,
  cera_total: 0
})

const getDashCountStat = async () => {
  state.cera_total = 1000
  state.cera_point_total = 1000
  state.user_total = 1000
  state.charac_total = 1000
}

getDashCountStat()
</script>

<style lang="scss" scoped>
.dash-header {
  .el-card {
    position: relative;
  }

  p {
    font-size: 28px;
  }

  .right-icon {
    position: absolute;
    top: 53%;
    right: 25px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    color: var(--el-color-primary);
    text-align: center;
    background: var(--el-color-primary-light-9);
    border-radius: 50%;
    transform: translateY(-50%);

    .svg-icon {
      font-size: 28px;

      &.rela {
        position: relative;
        left: 3px;
        top: 4px;
      }
    }
  }
}
</style>
