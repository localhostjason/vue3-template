import isString from 'lodash/isString'
import isPlainObject from 'lodash/isPlainObject'

const trim = (data: object): object => {
  let newData = {}
  for (const [k, v] of Object.entries(data)) {
    newData[k] = isString(v) ? v.trim() : v
  }
  return newData
}

const trimArgs = (config: object): object => {
  // trim 参数
  // @ts-ignore
  let { method, data, params } = config
  try {
    if (method !== 'get') {
      if (isPlainObject(data)) {
        data = trim(data)
      }
      config['data'] = data
    } else {
      if (isPlainObject(params)) {
        params = trim(params)
      }
      config['params'] = params
    }
  } catch (e) {
    console.log('trim error:', e)
  }
  return config
}

export { trimArgs }

export const httpResponseMessageByCode = (code: number, errMsg: string): string => {
  // 根据自己业务 拦截error
  let message = ''
  switch (code) {
    case 403:
      message = '权限不足'
      break

    case 404:
      message = '相关的资源不存在'
      break

    case 401:
      message = errMsg
      break

    case 422:
      message = errMsg
      break

    case 500:
      message = '服务器错误'
      break
    default:
      message = '未知错误'
  }
  return message
}
