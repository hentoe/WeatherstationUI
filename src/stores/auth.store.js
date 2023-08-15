import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false
  }),
  actions: {
    setToken(token) {
      this.token = token
      this.isAuthenticated = true
    },
    clearToken() {
      this.token = null
      this.isAuthenticated = false
    }
  }
})
