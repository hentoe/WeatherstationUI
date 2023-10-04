import { defineStore, getActivePinia } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    isAuthenticated: false
  }),
  actions: {
    beforeCreate() {
      const storedToken = localStorage.getItem('token')
      this.token = storedToken || ''
      this.isAuthenticated = !!storedToken
    },
    setToken(token) {
      if (token) {
        this.token = token
        this.isAuthenticated = true
        localStorage.setItem('token', token)
      } else {
        this.token = ''
        this.isAuthenticated = false
        localStorage.removeItem('token')
      }
    },
    clearToken() {
      this.token = ''
      this.isAuthenticated = false
      localStorage.removeItem('token')
      getActivePinia()._s.forEach((store) => store.$reset())
    }
  }
})
