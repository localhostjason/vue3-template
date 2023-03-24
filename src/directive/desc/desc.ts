import { Directive } from 'vue'

const descInputDirective: Directive = {
  beforeMount(el, binding) {
    if (!binding.value) {
      return
    }

    el.$instance = document.createElement('div')
    el.$instance.innerText = binding.value
    el.$domInserted = true
    addElStyle(el)

    const arg = binding.arg

    addInsertElStyle(el.$instance, arg)
    el.appendChild(el.$instance)
  },
  unmounted(el) {
    el.$domInserted && el.$instance.parentNode && el.$instance.parentNode.removeChild(el.$instance)
    el.$instance && (el.$instance = null)
  }
}

function addInsertElStyle(instance, arg: any) {
  let styles = {
    'font-size': '12px',
    color: '#999',
    'margin-top': '-4px',
    'margin-bottom': '-8px'
  }
  if (arg === 'warning' || arg == 'warn') {
    styles.color = '#ff9032'
  }
  Object.keys(styles).forEach(property => {
    instance.style[property] = styles[property]
  })
}

function addElStyle(el: any) {
  const styles = {
    display: 'inline-grid'
  }
  Object.keys(styles).forEach(property => {
    el.style[property] = styles[property]
  })
}

export default descInputDirective
