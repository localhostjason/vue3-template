import cloneDeep from 'lodash/cloneDeep'
import { tableColumnMap } from '@/views/common/table_column/data/tableColumnMap'

export const getExtraColumn = async (key: string, dynamicColumn: boolean, dynamicColumnTemplateId: string) => {
  const columnMap = cloneDeep(tableColumnMap)

  if (!dynamicColumn) {
    return columnMap[key]
  }

  return columnMap[key.replace(dynamicColumnTemplateId, '')]
}


export const trans = (data: number) => {
  let num = data / Math.pow(1024, 1)
  let numType = 'kB'

  if (num > 1024) {
    num = num / Math.pow(1024, 1)
    numType = 'M'
  }

  if (num > 1024) {
    num = num / Math.pow(1024, 1)
    numType = 'G'
  }

  if (num > 1024) {
    num = num / Math.pow(1024, 1)
    numType = 'T'
  }

  return `${num.toFixed(2)} ${numType}`
}


export const getOutputPreview = (output: string) => {
  if (!output) {
    return '-'
  }

  try {
    const data = JSON.parse(output)

    if (data.sql) {
      return `${data.sql.slice(0, 80)}...`
    }
  } catch (e) {
  }

  return output
    .replace(/\n/g, ' ')
    .slice(0, 100)
}
