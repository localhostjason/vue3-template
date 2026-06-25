import { defineStore } from 'pinia'

interface DashState {
  scrollTop?: number // 调整 hash 定位
}

export const useDashStore = defineStore('dash',{
  state: (): DashState => ({
    scrollTop: undefined
  }),
  getters: {},
  actions: {
    setScrollTop(scrollTop: number | undefined): void {
      this.scrollTop = scrollTop
    }
  }
})
