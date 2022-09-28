import { http } from '@/utils/http'

export const login = (data: object): any => {
  return http.request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export const getUserInfo = (): any => {
  return http.request({
    url: `/user/info`,
    method: 'get'
  })
}
