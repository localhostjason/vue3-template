import { http } from '@/utils/http'
import type { EditUserInfo, UserInfo } from '@/views/user/list/type'
import type { Login, LoginResult } from '@/views/login/type'

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
    url: `/user/self`,
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
