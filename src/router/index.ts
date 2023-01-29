// @ts-ignore
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
import { AppRouteRecordRaw } from '@/router/types'

// @ts-ignore
import UserRoutes from './modules/user'

/**
 * Note: sub-menu only appear when route children. Length >= 1
 *
 * 属性：types.ts 可自定义
 *
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    showLink: true               if set false, item will not show in the sidebar(default is true)
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const basicRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'Dash',
    component: LAYOUT,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '概览',
          icon: 'home'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  },
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true
  },
  {
    path: '/redirect',
    component: LAYOUT,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  }
]

export const asyncRoutes = [...UserRoutes]

const r = basicRoutes.concat(asyncRoutes)

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: r as unknown as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
