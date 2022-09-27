// @ts-ignore
import { storageLocal } from '@/utils/storage'

const state = {
  token: storageLocal.getItem('token'),
  username: null,
  role: null
}

const mutations = {
  SET_TOKEN: (state: any, token: string) => {
    state.token = token
  },
  SET_USERNAME: (state: any, username: string) => {
    state.username = username
  },
  SET_ROLE: (state: any, role: string) => {
    state.role = role
  }
}

function removeStore(commit) {
  commit('SET_TOKEN', '')
  commit('SET_USERNAME', '')
  commit('SET_ROLE', '')

  storageLocal.clear()
}

const actions = {
  setToken({ commit }, token: string) {
    storageLocal.setItem('token', token)
    commit('SET_TOKEN', token)
  },

  setUserInfo({ commit }, { username, role }) {
    commit('SET_USERNAME', username)
    commit('SET_ROLE', role)
  },

  removeUserInfo({ commit }) {
    removeStore(commit)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
