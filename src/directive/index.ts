import type { App } from 'vue'
import { setupWavesDirective } from '@/directive/waves'

export function setupGlobDirectives(app: App) {
  setupWavesDirective(app)
}
