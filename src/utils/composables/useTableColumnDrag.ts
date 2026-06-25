import { computed, nextTick, onBeforeUnmount, onMounted, ref, Ref, watch } from 'vue'
import Sortable from 'sortablejs'
import { getDefaultColumns, tableColumnMap } from '@/views/common/table_column/data/tableColumnMap'
import { Column } from '@/views/common/table_column/data/types'
import { useTableColumnStore } from '@/store/modules/table_column'

interface UseTableColumnDragOptions<T = any> {
  /** el-table ref */
  tableRef: Ref<any>

  /** 列数据（computed / ref） */
  columns: Ref<Column[]>

  /** 当前表格 key（asset / user / xxx） */
  columnKey: string

  /** 拖拽完成后的回调（用于持久化） */
  onChange?: (fields: Column[]) => void

  /** 是否禁用拖拽 */
  disabled?: boolean

  firstLastField?: boolean // 第一个和最后一个不能拖 默认 true
}

export const getTableDragColumn = (key: string, data: Ref<string>, dk = '') => {
  return computed(() => {
    try {
      const selectedFields: Column[] = JSON.parse(data.value)[key] || []

      if (!selectedFields.length) return getDefaultColumns(dk || key)

      const allColumns = tableColumnMap[dk || key] || []
      // merge 补全完整 column, json string 会将func 变成 null
      return selectedFields.map(v => {
        const col = allColumns.find(item => item.field === v.field)
        if (!col) return v
        return col
      })
    } catch (e) {
      return getDefaultColumns(dk || key)
    }
  })
}

export function useTableColumnDrag<T = any>(
  options: UseTableColumnDragOptions<T>
) {
  const {
    tableRef,
    columns,
    onChange,
    disabled = false,
    firstLastField = true,
    columnKey
  } = options

  let sortable: Sortable | null = null

  const initSortable = async () => {
    if (disabled) return
    if (!tableRef.value) return

    await nextTick()

    const el = tableRef.value.$el as HTMLElement
    const headerRow = el?.querySelector(
      '.el-table__header-wrapper thead tr'
    ) as HTMLElement | null

    if (!headerRow) return

    sortable?.destroy()

    sortable = Sortable.create(headerRow, {
      animation: 150,
      handle: '.cell',
      ghostClass: 'column-drag-ghost',
      dragClass: 'column-drag-dragging',

      filter: (evt) => {
        const th = (evt.target as HTMLElement).closest('th.is-leaf')
        if (!th) return true
        const thsArr = Array.from(headerRow.querySelectorAll('th.is-leaf'))
        const index = thsArr.indexOf(th)
        // 第一个和最后一个不能拖
        if (firstLastField) {
          return index === 0 || index === thsArr.length - 1
        }
        return false
      },

      onEnd(evt) {
        let { oldIndex, newIndex } = evt
        if (firstLastField && oldIndex !== undefined && newIndex !== undefined) {
          oldIndex = oldIndex - 1
          newIndex = newIndex - 1
        }

        if (oldIndex == null || newIndex == null || oldIndex === newIndex) {
          return
        }

        const cols = [...columns.value]
        const moved = cols.splice(oldIndex, 1)[0]
        cols.splice(newIndex, 0, moved)

        // 同步列顺序（通过 onChange 交给外部）
        onChange?.(cols)
      }
    })
  }

  /** columns 变化时重新挂载（如显隐列变化） */
  watch(
    () => columns.value,
    () => {
      initSortable()
    },
    { deep: true }
  )

  onMounted(() => {
    initSortable()
  })

  onBeforeUnmount(() => {
    sortable?.destroy()
    sortable = null
  })
}

/**
 * 表格列拖拽 + 列宽自适应的组合函数，封装了常用样板代码
 *
 * 用法：const { tableRef } = useTableDragable(UserColumnKey)
 *
 * @param key     - 表格 column key
 * @param options - 可选配置 { dk, disabled, firstLastField }
 * @returns { tableRef }
 */
export function useTableDragable(
  key: string,
  options?: {
    dk?: string
    disabled?: boolean
    firstLastField?: boolean
  }
) {
  const tableRef = ref<any>(null)
  const tableColumnStore = useTableColumnStore()
  const _data = computed(() => tableColumnStore.getSelectedColumn)

  useTableColumnDrag({
    tableRef,
    columns: getTableDragColumn(key, _data, options?.dk),
    columnKey: key,
    disabled: options?.disabled,
    firstLastField: options?.firstLastField ?? true,
    onChange(fields) {
      tableColumnStore.setSelectedColumnOrder(key, fields)
    }
  })

  return { tableRef }
}
