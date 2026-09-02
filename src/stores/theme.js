import { defineStore } from 'pinia'

const STORAGE_KEY = 'sfs-theme'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    current: localStorage.getItem(STORAGE_KEY) || 'lightTheme',
  }),
  getters: {
    isDark: (state) => state.current === 'darkTheme',
  },
  actions: {
    toggle() {
      this.current = this.current === 'lightTheme' ? 'darkTheme' : 'lightTheme'
      localStorage.setItem(STORAGE_KEY, this.current)
    },
    set(theme) {
      this.current = theme
      localStorage.setItem(STORAGE_KEY, theme)
    },
  },
})
