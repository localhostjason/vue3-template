<template>
  <el-row class="mt">
    <el-col :span="24">
      <div class="bot" style="height: 20px; margin-bottom: 13px; background: #fff">
        <div class="bline-dotted">
          <div class="category-index">{{ num }}</div>
          <div class="category-name">{{ title }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'PanelStep',
  props: {
    num: {
      type: [String, Number],
      required: true,
      default: 1
    },
    title: {
      type: String
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bline-dotted {
  //border-bottom: 1px dotted #000;
}

.category-index {
  position: absolute;
  padding-top: 4px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  left: 0;
  top: 6px;
  width: 20px;
  height: 20px;
  background: #4385f5;
  border-radius: 50px;
}

.category-name {
  position: absolute;
  left: 26px;
  font-size: 12px;
  top: 1px;
  background: #fff;
  height: 28px;
  padding: 8px 8px;
  color: #303133;
  font-family: 'MicrosoftYaHei';
  font-weight: 600;
}
</style>
