import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'

export default createStore({
  getters,
  modules: {
    app,
    user,
    permission
  }
})
