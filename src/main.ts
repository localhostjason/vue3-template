import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// @ts-ignore
import * as ElIcon from '@element-plus/icons-vue'

import SvgIcon from './components/SvgIcon/index.vue'
import './icons'
import './permission'

// 导入公共样式
import 'normalize.css/normalize.css'
import './styles/index.scss'

// init
;(async () => {
  const app = createApp(App)

  // 加载 router
  app.use(router)

  //  加载 store
  app.use(store)

  // 加载 element ui
  app.use(ElementPlus, {
    size: 'small'
  })
  for (const iconName in ElIcon) {
    app.component(iconName, ElIcon[iconName])
  }

  // 加载svg
  app.component('svg-icon', SvgIcon)
  app.mount('#app', true)
})()
