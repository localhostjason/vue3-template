<template>
  <el-table-column v-for="item in tableColumns.filter(value => value.field !== 'none')"
                   :prop="item.field"
                   :key="item.field"
                   :label="item.label"
                   :width="item.width"
                   :align="item.align"
                   :resizable="true"
                   :sortable="item.sortable"
                   :show-overflow-tooltip="!item.hideTip">
    <template #default="scope">

      <template v-if="item.renderType === 'copy'">
        <span>{{ scope.row[item.field] }}</span>
        <el-icon style="vertical-align: middle; cursor: pointer" class="ml-5" @click="copyRow(scope.row[item.field])">
          <CopyDocument />
        </el-icon>
      </template>

      <template v-else-if="item.renderType === 'link'">
        <span class="span-color" @click="showDetail(scope.row, item.renderResource)">
         {{ isNumber(getValueByPath(scope.row, item.field)) ? getValueByPath(scope.row, item.field) : (getValueByPath(scope.row, item.field) || '0') }}
        </span>
      </template>

      <template v-else-if="item.renderType === 'length_link'">
        <span class="span-color" @click="showDetail(scope.row, item.renderResource)">
          {{ scope.row[item.field]?.length || '0' }}
        </span>
      </template>

      <template v-else-if="item.renderType === 'text_state'">
        <div style="display: flex; align-items: center">
          <div class="success_btn mr-5" v-if="scope.row[item.renderResource]"></div>
          <div class="danger_btn mr-5" v-else></div>
          <span>{{ scope.row[item.field] }}</span>
        </div>
      </template>

      <template v-else-if="item.renderType === 'link_id'">
        <span class="span-color" @click="showDetail(scope.row, item.renderResource)">
          {{ scope.row[item.field] }}
        </span>
      </template>


      <template v-else-if="item.renderType === 'switch'">
        <el-switch v-model="scope.row[item.field]" class="custom-switch" :width="38"
                   @change="switchHandler(scope.row)" />
      </template>

      <template v-else-if="item.renderType === 'color'">
        <el-color-picker v-model="scope.row[item.field]" :teleported="false" style="pointer-events: none" />
      </template>

      <template v-else-if="item.renderType === 'trans'">
        <span>{{ trans(getValueByPath(scope.row, item.field)) }}</span>
      </template>


      <template v-else-if="item.renderType === 'dateFormat'">
        <span>
          {{ getValueByPath(scope.row, item.field) ? dateFormat(getValueByPath(scope.row, item.field)) : '-' }}
        </span>
      </template>

      <template v-else-if="['builtin'].includes(item.field)">
        <span v-if="scope.row[item.field]">内置</span>
        <span v-else>自定义</span>
      </template>

      <template v-else-if="item.renderType === 'state_icon'">
        <span v-if="scope.row[item.field]" class="text-success" style="font-size: 14px">✔</span>
        <span v-else>-</span>
      </template>

      <template v-else>
        <span>{{
            isNumber(getValueByPath(scope.row, item.field)) ?
              getValueByPath(scope.row, item.field) :
              (getValueByPath(scope.row, item.field) || '-')
          }}</span>
      </template>

    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import { useTableColumnStore } from '@/store/modules/table_column'
import { computed, ref } from 'vue'
import { getDefaultColumns, tableColumnMap } from '@/views/common/table_column/data/tableColumnMap'
import { CopyDocument } from '@element-plus/icons-vue'
import useClipboard from 'vue-clipboard3'
import isNumber from 'lodash/isNumber'
import { errorMessage, successMessage } from '@/utils/element/message'
import { dateFormat } from '@/utils'
import { getContrastTextColor } from '@/utils/color'
import { trans } from '@/views/common/table_column/util'
import { Column } from '@/views/common/table_column/data/types'

const { toClipboard } = useClipboard()

const emit = defineEmits(['showDetail', 'switchHandler', 'reloadTags', 'doAction'])
const showDetail = (row: any, name: any) => {
  emit('showDetail', row, name || 'base')
}

const switchHandler = (row: any) => {
  emit('switchHandler', row)
}

const props = defineProps({
  columnKey: { type: String, required: true, default: 'asset' },
  dynamicColumn: { type: Boolean, default: false },
  dynamicColumnTemplateId: { type: String, default: '' }
})

const currentKey = computed(() => {
  if (props.dynamicColumn && props.dynamicColumnTemplateId) {
    return `${props.columnKey}${props.dynamicColumnTemplateId}`
  }
  return props.columnKey
})

const tableColumnStore = useTableColumnStore()
const tableColumns = computed(() => {
  const key = currentKey.value

  try {
    const data = tableColumnStore.getSelectedColumn
    const selectedFields: Column[] = JSON.parse(data)[key] || []

    if (!selectedFields.length) return getDefaultColumns(props.columnKey)

    const allColumns = tableColumnMap[props.columnKey] || []
    // merge 补全完整 column, json string 会将func 变成 null
    return selectedFields.map(v => {
      const col = allColumns.find(item => item.field === v.field)
      if (!col) return v
      return col
    })
  } catch {
    return getDefaultColumns(props.columnKey)
  }
})

const copyRow = async (data: any) => {
  try {
    await toClipboard(isNumber(data) ? String(data) : data)
    successMessage('复制成功')
  } catch (e) {
    errorMessage('复制失败' + e)
  }
}

const getValueByPath = (obj: any, path: string) => {
  if (!obj || !path) return '-'

  return path.split('.').reduce((acc, key) => {
    return acc?.[key]
  }, obj) ?? '-'
}
</script>

<style lang="scss" scoped>

.tag-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 编辑按钮默认隐藏 */
.edit-btn {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

/* hover 行时显示按钮 */
.el-table__row:hover .edit-btn {
  opacity: 1;
  pointer-events: auto;
}


/* disabled + 关闭 */
.custom-switch.is-disabled {
  --el-switch-off-color: #c4c6cc;
}

/* disabled + 开启 */
.custom-switch.is-disabled.is-checked {
  --el-switch-on-color: #409effa3;
}

/* disabled 时滑块颜色 */
.custom-switch.is-disabled .el-switch__core::after {
  background-color: #f2f3f5;
}


.output-preview {
  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  cursor: pointer;

  color: #409eff;

  width: 100%;
}

.output-preview:hover {
  text-decoration: underline;
}
</style>
