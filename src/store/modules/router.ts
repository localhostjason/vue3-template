import { defineStore } from 'pinia'
import { storageLocal } from '@/utils/storage'

interface RouterModuleState {
  currentRouterModule: string  // 'main'. 'ticket'
}

export const useRouterMStore = defineStore('app-router-module', {
  state: (): RouterModuleState => ({
    currentRouterModule: sessionStorage.getItem('router_module') || 'dash'
  }),
  getters: {
    getCurrentRouterModule(): string {
      return sessionStorage.getItem('router_module') || this.currentRouterModule
    }
  },
  actions: {
    setCurrentRouterModule(data: string) {
      this.currentRouterModule = data
      sessionStorage.setItem('router_module', data)
    }
  }
})

