import { LAYOUT } from '@/router/constant'
import { AppRouteRecordRaw } from '@/router/types'

const userRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/user',
    name: 'User',
    component: LAYOUT,
    meta: {
      title: '用户管理',
      icon: 'people'
    },
    redirect: 'list',
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '用户列表',
          icon: 'person'
        }
      },
      {
        path: 'list2',
        name: 'UserList2',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '用户列表2',
          icon: 'list'
        }
      }
    ]
  }
]

export default userRoutes
