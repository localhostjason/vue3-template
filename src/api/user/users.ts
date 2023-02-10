import { http } from '@/utils/http'

export const getUsers = () => {
  return http.request({
    url: `/user/list`,
    method: 'get'
  })
}

export const getUsersList = async () => {
  return [
    {
      id: 1,
      username: 'admin',
      last_login_time: '2023-02-10T10:07:56.8351023+08:00',
      time: '2023-02-09T14:41:19.3067481+08:00',
      password_time: '0001-01-01T00:00:00Z',
      role: 'admin',
      email: '',
      desc: '系统管理员',
      status: 1,
      notification: false
    },
    {
      id: 2,
      username: 'security',
      last_login_time: null,
      time: '2023-02-09T14:41:19.3067481+08:00',
      password_time: '0001-01-01T00:00:00Z',
      role: 'security',
      email: '',
      desc: '安全管理员',
      status: -1,
      notification: false
    },
    {
      id: 3,
      username: 'auditor',
      last_login_time: null,
      time: '2023-02-09T14:41:19.3067481+08:00',
      password_time: '0001-01-01T00:00:00Z',
      role: 'auditor',
      email: '',
      desc: '审计管理员',
      status: -1,
      notification: false
    }
  ]
}
