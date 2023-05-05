import { http } from '@/utils/http'
import type { EditUserInfo, Login, LoginResult, UserInfo } from '@/views/user/models/user/auth'

export const login = (data: Login): Promise<LoginResult> => {
  return http.request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export const logout = <T = void>(): Promise<T> => {
  return http.request({
    url: '/auth/logout',
    method: 'post'
  })
}

export const getUserInfo = <T = UserInfo>(): Promise<T> => {
  return http.request({
    url: `/user/info`,
    method: 'get'
  })
}
export const updateUserInfo = <T = any>(data: EditUserInfo): Promise<T> => {
  return http.request({
    url: `/user/info`,
    method: 'put',
    data
  })
}
