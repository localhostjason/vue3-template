<template>
  <el-row style="width: calc(100% + 40px);position: relative;left: -20px;margin-bottom: 20px">
    <el-col :span="24">
      <div class="console-title clearfix" style="min-height: 50px;padding: 13px 0 0 20px"
           :class="isLine ? 'bline' : ''">
        <div class="pull-left">
          <h4 :style="{ borderLeftWidth: isLeftBorder ? '2px' : '0px'}">
            {{ title }}
          </h4>

          <slot name="button"></slot>

          <el-button size="small" class="btn-small" v-if="Boolean(backTitle)" @click="goHistory">
            <span class="icon-toinstlist"></span>
            <span style="font-size: 12px">{{ backTitle }}</span>
          </el-button>
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { useRouter } from 'vue-router'

const props = defineProps({
  isLine: propTypes.bool.def(true),
  isLeftBorder: propTypes.bool.def(true),
  title: propTypes.string.def('标题'),
  router: Object,
  backTitle: propTypes.string.def('')
})

const router = useRouter()

const goHistory = (): void => {
  if (!props.router) {
    router.go(-1)
    return
  }
  router.push({ ...props.router })
}
</script>

<style lang="scss" scoped>
.console-title:not(.bline) {
  margin-bottom: -10px;
}

.console-title {
  background: #FFFFFF;
  padding: 16px 0;
  min-height: 48px;
}

.pull-left {
  float: left;
}

.console-title h1,
.console-title h2,
.console-title h3,
.console-title h4,
.console-title h5,
.console-title h6 {
  display: inline-block;
  text-indent: 0;
  //border-left: 2px solid #39f;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 10px;
  vertical-align: top;
  font-weight: 700;
  color: #555;
  font-size: 18px;
}

.icon-toinstlist {
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
  background: url('../../../assets/toinstlist.png') center 1px no-repeat;
}

.btn-small {
  /*padding: 5px 15px;*/
  height: 21px;
  /*line-height: 16px;*/
}

.bline {
  border-bottom: 2px solid #dddddd;
  width: 100%;
}

.el-button--small {
  height: 22px !important;
}
</style>
