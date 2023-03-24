import { App } from 'vue'
import descInputDirective from './desc'

export function setupDescInputDirective(app: App) {
  app.directive('desc', descInputDirective)
}
