import Axios, { AxiosRequestConfig, Method, CancelTokenStatic, AxiosInstance, Canceler } from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { errorMessage } from '@/utils/message'

import { getRequestConfig } from './config'
import { trimArgs, httpResponseMessageByCode } from '@/utils/http/utils'
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
          config.headers['Authorization'] = `Bearer ${token}`
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
          const msg = '连接不上后台，已超时！'
          errorMessage(msg)
          return Promise.reject(msg)
        }

        const { msg, code } = error.response.data
        const message = httpResponseMessageByCode(status, msg)
        errorMessage(message)

        if (status === 401) {
          await userStore.removeUserStore()
          await router.push({ path: '/login' })
        }
        return Promise.reject(error)
      }
    )
  }

  public request<T = any>(data): Promise<T> {
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
