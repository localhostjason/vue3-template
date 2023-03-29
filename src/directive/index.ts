import type { App } from 'vue'
import { setupWavesDirective } from '@/directive/waves'
import { setupDescInputDirective } from '@/directive/desc'
import { setupCopyDirective } from '@/directive/copy'
import { setupPermissionDirectiveDirective } from '@/directive/permission'

export function setupGlobDirectives(app: App) {
  setupDescInputDirective(app)
  setupWavesDirective(app)
  setupCopyDirective(app)
  setupPermissionDirectiveDirective(app)
}
