import { AppRouteRecordRaw } from '@/router/types'
import { LAYOUT } from '@/router/constant'

const systemRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/system',
    component: LAYOUT,
    name: 'System',
    meta: {
      title: '系统配置'
    },
    redirect: '/system/base',
    children: [
      {
        path: 'base',
        name: 'BaseSetting',
        component: () => import('@/views/test.vue'),
        meta: {
          title: '基本设置',
          icon: 'v2-scale-to-original'
        }
      }
    ]
  }
]

export default systemRoutes
