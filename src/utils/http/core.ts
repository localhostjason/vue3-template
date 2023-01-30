import Axios, { AxiosRequestConfig, Method, CancelTokenStatic, AxiosInstance, Canceler } from 'axios'
import { ElMessage, ElNotification } from 'element-plus'

import { getRequestConfig } from './config'
import store from '@/store'
import { trimArgs } from '@/utils/http/utils'
import router from '@/router'
import { useUserStoreWithOut } from '@/store/modules/user'

export type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>

const userStore = useUserStoreWithOut()

class AxiosHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static axiosInstance: AxiosInstance = Axios.create(getRequestConfig())

  private httpInterceptorsRequest(): void {
    AxiosHttp.axiosInstance.interceptors.request.use(
      config => {
        const token = userStore.getToken
        if (token) {
          config.headers['Authorization'] = `Bearer ` + token
        }

        // trim 参数
        return trimArgs(config)
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  private httpInterceptorsResponse(): void {
    AxiosHttp.axiosInstance.interceptors.response.use(
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
          await userStore.removeUserStore()
          await router.push({ path: '/login' })
        }
        return Promise.reject(error)
      }
    )
  }

  public request(data): any {
    return new Promise((resolve, reject) => {
      AxiosHttp.axiosInstance
        .request(data)
        .then((response: any) => {
          return resolve(response)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }
}

export default AxiosHttp
