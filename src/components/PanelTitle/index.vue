<template>
  <el-row>
    <div class="console-title clearfix" style="min-height: 50px" :class="isLine ? 'bline' : ''">
      <div class="pull-left">
        <h4>{{ title }}</h4>

        <el-button size="mini" class="btn-small" v-if="Boolean(backTitle)" @click="goHistory">
          <span class="icon-toinstlist"></span>
          <span>{{ backTitle }}</span>
        </el-button>

        <slot name="button"></slot>
      </div>
    </div>
  </el-row>
</template>

<script lang="ts">
import { propTypes } from '@/utils/propTypes'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PanelTitle',
  props: {
    isLine: propTypes.bool.def(false),
    title: propTypes.string.def('标题'),
    router: Object,
    backTitle: propTypes.string.def('')
  },
  setup(props) {
    const router = useRouter()

    const goHistory = (): void => {
      if (!props.router) {
        router.go(-1)
        return
      }
      router.push({ ...props.router })
    }

    return {
      isLine: props.isLine,
      title: props.title,
      backTitle: props.backTitle,
      goHistory
    }
  }
})
</script>

<style scoped>
.console-title:not(.bline) {
  margin-bottom: -10px;
}

.console-title {
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
  text-indent: 8px;
  border-left: 2px solid #39f;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 8px;
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
  background: url('../../assets/toinstlist.png') center 1px no-repeat;
}

.btn-small {
  padding: 5px 15px;
  height: 20px;
  line-height: 16px;
  margin-top: -5px;
}
</style>
