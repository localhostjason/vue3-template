import wavesDirective from './waves'
import { App } from 'vue'

export function setupWavesDirective(app: App) {
  app.directive('waves', wavesDirective)
}
