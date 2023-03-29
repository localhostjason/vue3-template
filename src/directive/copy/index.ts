import { App } from 'vue'
import copyDirective from './copy'

export function setupCopyDirective(app: App) {
  app.directive('copy', copyDirective)
}
