import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import store from '@/store'
import router from '@/router'
import { trimArgs } from './utils'
import { getRequestConfig } from './config'

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache'
}

Object.assign(axios.defaults.headers.common, defaultHeaders)

// create an axios instance
const service = axios.create(getRequestConfig())

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ` + store.getters.token
    }

    // trim 参数
    return trimArgs(config)
  },
  error => {
    Promise.reject(error).then(r => console.log('err:', r))
  }
)

// response interceptor
service.interceptors.response.use(
  response => response.data,

  async error => {
    let status = 0
    try {
      status = error.response.status
    } catch (e) {
      ElMessage({
        message: '连接不上后台。已超时',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject('连接不上后台。已超时')
    }

    const errMsg = error.response.data.msg
    const errCode = error.response.data.code || ''

    let message
    // 根据自己业务 拦截error
    switch (status) {
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

      default:
        message = '服务器错误'
    }

    // 一些警告类型信息，不影响流程
    if (errCode === 'E_TOOL') {
      ElNotification({
        title: '警告',
        dangerouslyUseHTMLString: true,
        message: message,
        type: 'warning',
        duration: 0
      })
      return
    }

    ElMessage({
      message: `${message}`,
      type: 'error',
      duration: 3 * 1000
    })

    if (status === 401) {
      await store.dispatch('user/removeUserInfo')
      await router.push({ path: '/login' })
    }
    return Promise.reject(error)
  }
)

export default service
