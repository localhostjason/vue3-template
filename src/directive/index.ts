import type { App } from 'vue'
import { setupWavesDirective } from '@/directive/waves'
import { setupCopyDirective } from '@/directive/copy'
import { setupPermissionDirectiveDirective } from '@/directive/permission'

export function setupGlobDirectives(app: App) {
  setupWavesDirective(app)
  setupCopyDirective(app)
  setupPermissionDirectiveDirective(app)
}
