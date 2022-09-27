import request from '@/utils/http'

export const login = (data: object): any => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export const getUserInfo = (): any => {
  return request({
    url: `/user/info`,
    method: 'get'
  })
}
