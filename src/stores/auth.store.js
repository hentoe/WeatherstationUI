import { defineStore, getActivePinia } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    expiry: localStorage.getItem('expiry'),
    isAuthenticated: false
  }),
  actions: {
    beforeCreate() {
      const storedToken = localStorage.getItem('token')
      const storedExpiry = localStorage.getItem('expiry')
      this.token = storedToken || ''
      this.expiry = storedExpiry || ''
      this.isAuthenticated = !!storedToken
      if (!this.isTokenValid()) {
        this.clearToken()
      }
    },
    setToken(token, expiry) {
      if (token) {
        this.token = token
        this.expiry = expiry
        this.isAuthenticated = true
        localStorage.setItem('token', token)
        localStorage.setItem('expiry', expiry)
      } else {
        this.token = ''
        this.expiry = ''
        this.isAuthenticated = false
        localStorage.removeItem('token')
        localStorage.removeItem('expiry')
      }
    },
    clearToken() {
      this.token = ''
      this.expiry = ''
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('expiry')
      getActivePinia()._s.forEach((store) => store.$reset())
    },
    isTokenValid() {
      if (this.isAuthenticated && this.expiry) {
        const currentTimestamp = Date.now() // Get current timestamp in milliseconds
        const expiryTimestamp = new Date(this.expiry).getTime()

        // Check if the token expiry is in the future
        return expiryTimestamp > currentTimestamp
      }

      return false
    },
    async logout() {
      try {
        await axios.post('/api/user/logout/')
        this.clearToken()
      } catch (error) {
        console.error(error)
      }
    }
  }
})
