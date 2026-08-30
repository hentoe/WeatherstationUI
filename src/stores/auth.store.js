import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    expiry: localStorage.getItem('expiry') || ''
  }),
  getters: {
    isAuthenticated: (state) => {
      const expiryTimestamp = new Date(state.expiry).getTime()
      return Boolean(state.token && Number.isFinite(expiryTimestamp) && expiryTimestamp > Date.now())
    }
  },
  actions: {
    initialize() {
      if (this.token && !this.isAuthenticated) {
        this.clearToken()
      }
    },
    setToken(token, expiry) {
      const expiryTimestamp = new Date(expiry).getTime()

      if (token && Number.isFinite(expiryTimestamp) && expiryTimestamp > Date.now()) {
        this.token = token
        this.expiry = expiry
        localStorage.setItem('token', token)
        localStorage.setItem('expiry', expiry)
      } else {
        this.clearToken()
      }
    },
    clearToken() {
      this.token = ''
      this.expiry = ''
      localStorage.removeItem('token')
      localStorage.removeItem('expiry')
    },
    async getApiKey(email, password) {
      try {
        return await api.post('/api/users/token/', {
          email: email,
          password: password
        })
      } catch (error) { throw error }
    },
    async setPassword(current_password, new_password, re_new_password) {
      try {
        await api.post('/api/users/set_password/', {
          new_password: new_password,
          re_new_password: re_new_password,
          current_password: current_password
        })
      } catch (error) { throw error }
    },
    async logout() {
      try {
        await api.post('/api/users/logout/')
        this.clearToken()
      } catch (error) { throw error }
    }
  }
})
