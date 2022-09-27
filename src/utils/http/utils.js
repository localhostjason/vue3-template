import isString from 'lodash/isString'
import isPlainObject from 'lodash/isPlainObject'

function trim(data) {
  let newData = {}
  for (const [k, v] of Object.entries(data)) {
    newData[k] = isString(v) ? v.trim() : v
  }
  return newData
}

export function trimArgs(config) {
  // trim 参数
  const cfg = config
  try {
    if (cfg.method !== 'get') {
      let newData = cfg.data
      if (isPlainObject(cfg.data)) {
        newData = trim(cfg.data)
      }
      cfg.data = newData
    } else {
      let newData = cfg.params
      if (isPlainObject(cfg.params)) {
        newData = trim(cfg.params)
      }
      cfg.params = newData
    }
  } catch (e) {
    console.log('trim error:', e)
  }
  return cfg
}
