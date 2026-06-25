import { AppRouteRecordRaw } from '@/router/types'
import { TreeRoutes } from '@/utils/menu/model'


export const buildTree = (
  routes: AppRouteRecordRaw[],
  allKeys: string[],
  parentKeys: string[],
  basePath = '/',
  disabled = false
): TreeRoutes[] => {

  return routes
    .filter(route => !route.hidden)
    .map(route => {

      const fullPath = `${basePath}/${route.path}`.replace(/\/+/g, '/')

      const node: TreeRoutes = {
        path: fullPath,
        name: route.name,
        title: route.meta?.title,
        disabled
      }

      allKeys.push(route.name as string)

      if (route.children?.length) {
        parentKeys.push(route.name as string)

        node.children = buildTree(
          route.children,
          allKeys,
          parentKeys,
          fullPath,
          disabled
        )
      }

      return node
    })
}


