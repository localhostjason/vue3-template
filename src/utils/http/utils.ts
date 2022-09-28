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
