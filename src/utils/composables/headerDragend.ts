import { TableColumnCtx } from 'element-plus'
import { computed, nextTick, ref, Ref } from 'vue'
import { useTableColumnStore } from '@/store/modules/table_column'
import { getTableDragColumn } from '@/utils/composables/useTableColumnDrag'

/**
 * 表格列宽自适应组合函数
 *
 * 用法：
 * 1. 最后一列绑定 `:width="tableColAutoWidth"` 作为弹性填充列
 * 2. el-table 上绑定 `@header-dragend="handleHeaderDragend"`
 * 3. 弹性列（未配置 width）被拖拽时自动重置为填充模式
 *
 * @param key     - 表格 column key（如 UserColumnKey）
 * @param tableRef - el-table 的 template ref
 * @param dk       - 动态 column key，可选
 * @param defaultWidth
 * @returns { tableColAutoWidth, handleHeaderDragend }
 */
export function useTableAutoWidth(
  key: string,
  tableRef: Ref<any>,
  dk?: string,
  defaultWidth: string = '120px'
) {
  const tableColAutoWidth = ref<string>(defaultWidth) // 弹性列宽度，默认 120px

  const handleHeaderDragend = (
    newWidth: number,
    oldWidth: number,
    column: TableColumnCtx<any>
  ) => {
    const tableColumnStore = useTableColumnStore()
    const _data = computed(() => tableColumnStore.getSelectedColumn)
    const columns = getTableDragColumn(key, _data, dk).value

    const col = columns.find(c => c.field === column.property)
    if (!col) return

    // 弹性列（未配置 width）被拖拽 → 重置为自动填充
    if (!col.width) {
      tableColAutoWidth.value = ''
      return
    }

    // 固定宽度列被拖拽 → 触发布局重算
    nextTick(() => {
      tableRef.value?.doLayout()
    })
  }

  return {
    tableColAutoWidth,
    handleHeaderDragend
  }
}
