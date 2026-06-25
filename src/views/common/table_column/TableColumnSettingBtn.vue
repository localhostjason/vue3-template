<template>
  <div class="ml-10">
    <el-tooltip content="列表配置" placement="top">
      <el-button type="primary" :icon="Setting" link
                 style="border: 1px solid #dddddd; padding: 0 8px;height: 28px !important;"
                 @click="columnSetting">
      </el-button>
    </el-tooltip>
    <TableColumnDialog :dynamic-column="dynamicColumn" :dynamic-column-template-id="dynamicColumnTemplateId"
                       ref="tableColumnRef"></TableColumnDialog>
  </div>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue'
import TableColumnDialog from '@/views/common/table_column/TableColumnDialog.vue'
import { ref } from 'vue'

const tableColumnRef = ref<any>(null)

const props = defineProps({
  ck: { type: String },
  showDivider: { type: Boolean, default: true },
  dynamicColumn: { type: Boolean, default: false },
  dynamicColumnTemplateId: { type: String, default: '' }
})

const columnSetting = () => {
  let k = props.ck
  if (props.dynamicColumn && props.dynamicColumnTemplateId) {
    k = `${props.ck}${props.dynamicColumnTemplateId}`
  }

  tableColumnRef.value.showDialog(k)
}
</script>

<style lang="scss" scoped></style>
