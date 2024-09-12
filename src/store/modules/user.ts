import { storageLocal } from '@/utils/storage'
import { defineStore } from 'pinia'
import store from '@/store'
import Cookie from 'js-cookie'
import { User } from '@/views/user/list/type'

interface UserState {
  token?: string
  username?: string
  role?: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: undefined,
    username: undefined,
    role: undefined
  }),
  getters: {
    getToken(): string {
      return this.token || Cookie.get('token')
    },
    getUsername(): string | undefined {
      return this.username
    },
    getUserRole(): string | undefined {
      return this.role
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
      Cookie.set('token', token)
    },
    setUserInfo(user: User) {
      this.username = user.username
      this.role = user.role
    },
    removeUserStore() {
      this.token = ''
      this.username = ''
      this.role = ''
      Cookie.remove('token')
      storageLocal.clear()
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
