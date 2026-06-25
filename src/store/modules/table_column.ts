import { defineStore } from 'pinia'
import { storageLocal } from '@/utils/storage'
import { Column } from '@/views/common/table_column/data/types'

interface ColumnMap {
  [key: string]: Column[]
}

export const storeKey = 'table_column'


export const useTableColumnStore = defineStore('table-column', {

  state: () => ({
    selectedColumn: localStorage.getItem(storeKey) || '{}'
  }),
  getters: {
    getSelectedColumn(state): string {
      return state.selectedColumn
    }
  },
  actions: {
    setSelectedColumn(selected: string): void {
      this.selectedColumn = selected
      storageLocal.setItem(storeKey, selected)
    },

    // 更新顺序
    setSelectedColumnOrder(key: string, fields: Column[]) {
      let data: ColumnMap = {}

      try {
        data = JSON.parse(this.selectedColumn || '{}')
      } catch {
        data = {}
      }

      data[key] = [...fields]

      this.selectedColumn = JSON.stringify(data)
      storageLocal.setItem(storeKey, this.selectedColumn)
    }
  }
})
