import { Directive } from 'vue'
import { successMessage } from '@/utils/element/message'

const copyDirective: Directive = {
  mounted(el, binding) {
    const value = binding.value

    // add click event
    el.onclick = async () => {
      if (!value) {
        return
      }
      await navigator.clipboard.writeText(value)
      successMessage('复制成功')
    }
    el.addEventListener('click', el.handler)
  },
  unmounted(el) {
    el.removeEventListener('click', el.handler)
  }
}

export default copyDirective
