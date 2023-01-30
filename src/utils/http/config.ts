import { AxiosRequestConfig } from 'axios'
import store from '@/store'
import { useUserStoreWithOut } from '@/store/modules/user'

const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 10000, // request timeout
  headers: {
    Accept: 'application/json, text/plain, */*; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache'
  }
}

const userStore = useUserStoreWithOut()

const getRequestConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  const token = userStore.getToken
  if (token) {
    defaultConfig.headers['Authorization'] = `Bearer ${token}`
  }
  if (!config) {
    return defaultConfig
  }
  const { headers } = config
  if (headers && typeof headers === 'object') {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers
    }
  }

  return { ...excludeProps(config!, 'headers'), ...defaultConfig }
}

export { getRequestConfig }

function excludeProps<T extends { [key: string]: any }>(origin: T, prop: string): { [key: string]: T } {
  return Object.keys(origin)
    .filter(key => !prop.includes(key))
    .reduce((res, key) => {
      res[key] = origin[key]
      return res
    }, {} as { [key: string]: T })
}
