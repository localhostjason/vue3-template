import { asyncRoutes, resetRouter } from '@/router'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { buildTree } from '@/utils/menu/menu'
import cloneDeep from 'lodash/cloneDeep'
import sysRoutes from '@/router/system_setting'
import dashRoutes from '@/router/dash'
import { TreeRoutes } from '@/utils/menu/model'
import { ref } from 'vue'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useMenuStoreWithOut } from '@/store/modules/menu'
import { getUserInfo } from '@/api/user/auth'

const permissionStore = usePermissionStoreWithOut()

/** 与顶部导航切换模块顺序一致：首页 → 控制台 → 工单 → 审计 → 系统 */
export type PostLoginModule = 'dash' | 'main' | 'ticket' | 'audit' | 'system'

export type PostLoginTarget =
  | { name: string; module: PostLoginModule }
  | { path: string }

/** 与菜单/侧栏一致：不展示 hidden 路由（支持 `hidden` 或 `meta.hidden`） */
const isRouteHidden = (r: any): boolean => Boolean(r?.hidden === true || r?.meta?.hidden === true)

const routeTreeHasName = (routes: any[] | undefined, name: string): boolean => {
  if (!routes?.length) return false
  for (const r of routes) {
    if (r?.name === name) return true
    if (routeTreeHasName(r?.children, name)) return true
  }
  return false
}

/**
 * 根据当前已生成的权限路由，判断指定路由属于哪个模块。
 * 注意：这里不排除 hidden，因为 deep-link 到 hidden 页面时也要切到正确模块。
 */
export const resolveRouterModuleByRouteName = (name?: string): PostLoginModule | undefined => {
  if (!name) return undefined
  if (routeTreeHasName(permissionStore.dashRouters, name)) return 'dash'
  if (routeTreeHasName(permissionStore.routers, name)) return 'main'
  if (routeTreeHasName(permissionStore.systemRouters, name)) return 'system'
  return undefined
}

/**
 * 取第一个可用于登录落地的 route.name，不选 hidden 路由。
 * 隐藏父级时仍尝试其子级（与 `views/role/menu/util` 中 `buildTree` 过滤思路一致）。
 */
const firstVisibleRouteName = (routes: any[] | undefined): string | undefined => {
  if (!routes?.length) return undefined
  for (const r of routes) {
    if (isRouteHidden(r)) {
      continue
    }
    if (r.name) {
      return r.name as string
    }
    const nested = firstVisibleRouteName(r.children)
    if (nested) return nested
  }
  return undefined
}

/**
 * 在 `generateAccessRoutes` 完成后，根据当前用户可见的路由选择登录后默认落地页。
 */
export const resolvePostLoginTarget = (): PostLoginTarget => {
  const nDash = firstVisibleRouteName(permissionStore.dashRouters)
  if (nDash) return { name: nDash, module: 'dash' }

  const nMain = firstVisibleRouteName(permissionStore.routers)
  if (nMain) return { name: nMain, module: 'main' }

  const nSys = firstVisibleRouteName(permissionStore.systemRouters)
  if (nSys) return { name: nSys, module: 'system' }

  return { path: '/401' }
}


export const getDenyMenuNames = async () => {
  // todo api 接口
  return []
}


export const generateAccessRoutes = async (menu_names: string[], router: any) => {
  // generate accessible routes map based on roles
  const accessRoutes = permissionStore.generateRoutes(menu_names)
  const sysRoutes = permissionStore.generateSystemRoutes(menu_names)
  const dashRoutes = permissionStore.generateDashRoutes(menu_names)
  // dynamically add accessible routes
  resetRouter()
  const allRoutes = [...accessRoutes, ...sysRoutes, ...dashRoutes]
  allRoutes.forEach((val: any) => {
    router.addRoute(val)
  })
}

/**
 * 拉取用户信息、菜单权限并注册动态路由（与 `permission.ts` 守卫中逻辑一致）。
 * @returns deny 菜单名列表，供守卫判断当前路由是否无权访问
 */
export const loadUserSessionAndRoutes = async (router: any, userId: string): Promise<string[]> => {
  const userStore = useUserStoreWithOut()
  const menuStore = useMenuStoreWithOut()

  const user = await getUserInfo()
  userStore.setUserInfo(user)

  const menu_names = await getDenyMenuNames()
  menuStore.setMenuNames(menu_names)

  // await setLogoutTimeoutMinute() todo setLogoutTimeoutMinute()


  await generateAccessRoutes(menu_names, router)
  return menu_names
}


export const getAllMenuKeys = (): string[] => {
  // Tree 数据
  const consoleRoutes = ref<TreeRoutes[]>([])
  const systemRoutes = ref<TreeRoutes[]>([])
  const dashIRoutes = ref<TreeRoutes[]>([])

// Key缓存
  const consoleAllKeys = ref<string[]>([])
  const consoleParentKeys = ref<string[]>([])

  const systemAllKeys = ref<string[]>([])
  const systemParentKeys = ref<string[]>([])

  const dashAllKeys = ref<string[]>([])
  const dashParentKeys = ref<string[]>([])

  consoleRoutes.value = buildTree(cloneDeep(asyncRoutes), consoleAllKeys.value, consoleParentKeys.value)
  systemRoutes.value = buildTree(cloneDeep(sysRoutes), systemAllKeys.value, systemParentKeys.value)
  dashIRoutes.value = buildTree(cloneDeep(dashRoutes), dashAllKeys.value, dashParentKeys.value)

  return [
    ...consoleAllKeys.value,
    ...systemAllKeys.value,
    ...dashAllKeys.value
  ]
}
