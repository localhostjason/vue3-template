import { Column } from '@/views/common/table_column/data/types'
import { userColumn } from '@/views/common/table_column/data/user'

export const tableColumnMap: Record<string, Column[]> = {
  ...userColumn,
}

export const getDefaultColumns = (key: string) => {
  const lst = tableColumnMap[key]
  return lst.filter(value => value.disabled || value.init)
}

