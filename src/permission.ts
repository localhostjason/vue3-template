// @ts-ignore
import NProgress from '@/utils/progress'
import router from './router'
import store from '@/store'
import { getUserInfo } from '@/api/auth'

// @ts-ignore
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login']

router.beforeEach(async (to, _from, next) => {
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  if (!store.getters.token) {
    whiteList.includes(to.path) ? next() : next(`/login`)
    NProgress.done()
    return
  }

  if (to.path === '/login') {
    next({ path: '/' })
    NProgress.done()
    return
  }

  if (store.getters.username) {
    next()
    return
  }

  try {
    const data = await getUserInfo()
    await store.dispatch('user/setUserInfo', data)
    // todo menu 权限
    // generate accessible routes map based on roles

    next()
  } catch (error) {
    console.log('err:', error)
    // remove token and go to login page to re-login
    await store.dispatch('user/removeUserInfo')
    next(`/login`)
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
