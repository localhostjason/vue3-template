import { LAYOUT } from '@/router/constant'

const dashRoutes = [
  {
    path: '/',
    name: 'Dash',
    component: LAYOUT,
    redirect: '/dashboard',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'v2-data-line'
        }
      }
    ]
  }
]

export default dashRoutes
