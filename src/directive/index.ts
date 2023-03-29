import type { App } from 'vue'
import { setupWavesDirective } from '@/directive/waves'
import { setupDescInputDirective } from '@/directive/desc'
import { setupCopyDirective } from '@/directive/copy'

export function setupGlobDirectives(app: App) {
  setupDescInputDirective(app)
  setupWavesDirective(app)
  setupCopyDirective(app)
}
