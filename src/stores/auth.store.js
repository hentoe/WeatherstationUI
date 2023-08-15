import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token')
  }),
  actions: {
    setToken(token) {
      this.token = token
      this.isAuthenticated = true
      localStorage.setItem('token', token)
    },
    clearToken() {
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})
