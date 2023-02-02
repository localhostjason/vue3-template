import { http } from '@/utils/http'

export const login = (data: object) => {
  return http.request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export const logout = () => {}

export const getUserInfo = () => {
  return http.request({
    url: `/user/info`,
    method: 'get'
  })
}
export const updateUserInfo = (data: object) => {
  return http.request({
    url: `/user/info`,
    method: 'put',
    data
  })
}
