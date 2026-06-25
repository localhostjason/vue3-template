import NProgress from '@/utils/progress'
import { useUserStoreWithOut } from '@/store/modules/user'
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import { getPageTitle } from '@/utils/get-page-title'
import { loadUserSessionAndRoutes, resolvePostLoginTarget, resolveRouterModuleByRouteName } from '@/permission_util'
import { useRouterMStore } from '@/store/modules/router'

const whiteList = ['/login']
const userStore = useUserStoreWithOut()
const routerMStore = useRouterMStore()

const isNotFoundRoute = (to: RouteLocationNormalized): boolean => {
  // 404 是 `/:pathMatch(.*)` 且通常无 name
  return !to.matched?.length || to.matched.some(r => r.path === '/:pathMatch(.*)')
}

const redirectToFirstAccessible = (
  next: NavigationGuardNext,
  replace = true
): void => {
  const target = resolvePostLoginTarget()
  if ('path' in target) {
    next({ path: target.path, replace })
  } else {
    routerMStore.setCurrentRouterModule(target.module)
    next({ name: target.name, replace })
  }
}

export const setupPermissionRouter = (router: Router) => {
  router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    NProgress.start()

    // 动态修改 term 开头的路由 title
    if (to.name?.toString().startsWith('Term')) {
      const protocol = to.query.protocol
      to.meta.title = protocol ? `${protocol} ${to.meta.title}` : to.meta.title
    }

    if (to.query.activeMenu) {
      to.meta.activeMenu = to.query.activeMenu
    }

    // set page title
    document.title = getPageTitle(to.meta.title)

    const token = userStore.getToken
    const username = userStore.getUsername
    if (!token) {
      whiteList.includes(to.path) ? next() : next(`/login`)
      NProgress.done()
      return
    }

    if (whiteList.includes(to.path)) {
      // 已登录再进登录相关页面：按权限落到非 hidden 的首屏，避免固定 `/`
      redirectToFirstAccessible(next)
      NProgress.done()
      return
    }

    if (username) {
      // 已有用户信息：访问根路径但无 Dashboard（会命中 404）时，跳到首个可访问页面
      if (to.path === '/' && isNotFoundRoute(to)) {
        redirectToFirstAccessible(next)
        NProgress.done()
        return
      }

      const module = resolveRouterModuleByRouteName(to.name as string | undefined)
      if (module) routerMStore.setCurrentRouterModule(module)
      next()
      return
    }

    try {
      const menu_names = await loadUserSessionAndRoutes(router, '')

      if (menu_names.includes(<string>to.name)) {
        next(`/401`)
        NProgress.done()
        return
      }

      // 权限路由已注入：若根路径仍命中 404，说明没首页权限，改为跳到首个可访问页面
      if (to.path === '/' && isNotFoundRoute(to)) {
        redirectToFirstAccessible(next)
        NProgress.done()
        return
      }

      const module = resolveRouterModuleByRouteName(to.name as string | undefined)
      if (module) routerMStore.setCurrentRouterModule(module)

      next({ ...to, replace: true })
    } catch (error) {
      console.log('err:', error)
      // remove token and go to login page to re-login
      userStore.removeUserStore()
      localStorage.setItem('remove_user_store', 'permission err')
      next(`/login`)
      NProgress.done()
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
