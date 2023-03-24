import type { App } from 'vue'
import { setupWavesDirective } from '@/directive/waves'
import { setupDescInputDirective } from '@/directive/desc'

export function setupGlobDirectives(app: App) {
  setupDescInputDirective(app)
  setupWavesDirective(app)
}
