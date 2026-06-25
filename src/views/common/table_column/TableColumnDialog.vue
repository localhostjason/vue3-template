<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    width="700px"
  >
    <el-row>
      <el-form label-position="top">
        <el-form-item label="选择可见属性列">
          <!-- 全部：单独一行 -->
          <div class="check-all">
            <el-checkbox
              size="default"
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全部
            </el-checkbox>
          </div>

          <!-- 列表：四列 Grid -->
          <el-checkbox-group
            size="default"
            class="column-checkbox-group"
            v-model="checkedColumn"
            @change="handleCheckedChange"
          >
            <el-checkbox
              v-for="item in columnList"
              :key="item.field"
              :label="item.label"
              :value="item"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-row>
    <template #footer>
      <el-button @click="resetColumn">恢复默认</el-button>
      <tc-button type="primary" @click="submit">确 定</tc-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import TcButton from '@/components/TcButton/src/TcButton.vue'
import { CheckboxValueType } from 'element-plus'
import { Column } from '@/views/common/table_column/data/types'
import { tableColumnMap } from '@/views/common/table_column/data/tableColumnMap'
import { useTableColumnStore } from '@/store/modules/table_column'
import { getExtraColumn } from '@/views/common/table_column/util'

const dialog = reactive({
  visible: false,
  title: ''
})

const props = defineProps({
  dynamicColumn: { type: Boolean, default: false },
  dynamicColumnTemplateId: { type: String, default: '' }
})


const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedColumn = ref<Column[]>([])
const columnList = ref<Column[]>([])
const currentKey = ref<string>('')

const tableColumnStore = useTableColumnStore()

const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedColumn.value = val ? columnList.value : columnList.value.filter(v => v.disabled || v.init)
  isIndeterminate.value = checkedColumn.value.length !== columnList.value.length
}

const handleCheckedChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === columnList.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < columnList.value.length
}


const showDialog = async (key: string) => {
  dialog.visible = true
  dialog.title = '列表配置'
  currentKey.value = key

  const resp = tableColumnStore.getSelectedColumn
  let cache: Record<string, Column[]> = {}
  if (resp) {
    cache = JSON.parse(resp)
  }
  columnList.value = await getExtraColumn(key, props.dynamicColumn, props.dynamicColumnTemplateId)


  if (!Object.keys(cache).includes(key)) {
    checkedColumn.value = columnList.value.filter(v => v.disabled || v.init)
    mergeColumn()
    return
  }
  checkedColumn.value = cache[currentKey.value]
  mergeColumn()
}

const mergeColumn = () => {
  const allColumns = columnList.value
  // merge 补全完整 column, json string 会将func 变成 null
  checkedColumn.value.map(v => {
    const col = allColumns.find(item => item.field === v.field)
    if (!col) return v
    if (v.renderResource) v.renderResource = col.renderResource
    return col
  })
}

const resetColumn = () => {
  // reset :: remove attrs.status field
  columnList.value = tableColumnMap[currentKey.value.replace(props.dynamicColumnTemplateId, '')]
  checkedColumn.value = columnList.value.filter(v => v.disabled || v.init)

  isIndeterminate.value = true
  save()
  close()
}

const submit = () => {
  save()
  close()
}

const save = () => {
  const resp = tableColumnStore.getSelectedColumn
  let cache: Record<string, Column[]> = {}
  if (resp) {
    cache = JSON.parse(resp)
  }
  cache[currentKey.value] = checkedColumn.value
  tableColumnStore.setSelectedColumn(JSON.stringify(cache))
}
const close = () => {
  dialog.visible = false
}

defineExpose({
  showDialog
})
</script>

<style scoped>
.check-all {
  width: 100%;
  margin-bottom: 12px;
}

.column-checkbox-group {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px 16px;
}
</style>
