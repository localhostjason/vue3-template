import { defineStore } from 'pinia'
import store from '@/store'

interface MenuState {
  menu_names?: string[]
}

export const useMenuStore = defineStore({
  id: 'app-menu',
  state: (): MenuState => ({
    menu_names: []
  }),
  getters: {},
  actions: {
    setMenuNames(menus: string[]) {
      this.menu_names = menus
    },

    removeMenuStore() {
      this.menu_names = []
    }
  }
})


export function useMenuStoreWithOut() {
  return useMenuStore(store)
}



