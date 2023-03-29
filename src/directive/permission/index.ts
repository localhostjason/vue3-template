import { App } from 'vue'
import permissionDirective from './permission'

export function setupPermissionDirectiveDirective(app: App) {
  app.directive('permission', permissionDirective)
}
