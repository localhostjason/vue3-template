/**
 * 树结构
 */
export interface TreeRoutes {
  path: string
  name?: string
  title?: string
  disabled?: boolean
  children?: TreeRoutes[]
}
