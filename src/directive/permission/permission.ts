import { Directive } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { isArray } from 'lodash'

const permissionDirective: Directive = {
  mounted(el, binding) {
    const userStore = useUserStore()

    const value = binding.value
    if (!value || !isArray(value)) return

    if (!value.includes(userStore.role)) {
      el.parentNode?.removeChild(el)
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unmounted(el) {}
}

export default permissionDirective
