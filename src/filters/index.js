import moment from 'moment'

/***
 * 这里应该放 vue filters 的函数 {{ test | func1 | func2(args1, args2) }}
 * 现在 当utils 的函数使用
 */

/* 数字 格式化*/
export function dateFormat(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
}

export function subtractDate(dataStr, days = 30, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).subtract(days, 'd').format(pattern)
}

export function addDate(dataStr, days = 30, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).add(days, 'd').format(pattern)
}

export function compareDate(date_now, compare_date, pattern = 'YYYY-MM-DD HH:mm:ss') {
  const now = moment(date_now).format(pattern)
  const compare_time = moment(compare_date).format(pattern)

  return moment(compare_time).isBefore(now)
}
