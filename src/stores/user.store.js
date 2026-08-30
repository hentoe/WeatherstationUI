import { defineStore } from 'pinia'
import api from '@/services/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    is_staff: ''
  }),
  actions: {
    async fetchUserData() {
      try {
        const response = await api.get('/api/users/me/')
        this.name = response.data.name
        this.email = response.data.email
        this.is_staff = response.data.is_staff
      } catch (error) { throw error }
    },
    async updateUserName(newName) {
      try {
        const response = await api.patch('/api/users/me/', { name: newName })
        this.name = response.data.name
        return response
      } catch (error) {
        throw error
      }
    },
    async updateEmail(newEmail, password) {
      try {
        const response = await api.post('/api/users/set_email/', {
          new_email: newEmail,
          current_password: password
        })
        if (response.status === 204) {
          this.email = newEmail
        }
        return response
      } catch (error) {
        throw error
      }
    },
    async registerNewUser(newUser) {
      try {
        const response = await api.post('/api/users/', newUser)
        this.name = response.data.name
        this.email = response.data.email
        return response
      } catch (error) {
        throw error
      }
    },
    async resendActivationEmail(email) {
      try {
        const response = await api.post('/api/users/resend_activation/', { email: email })
        return response
      } catch (error) {
        throw error
      }
    },
    async recoverPassword(email) {
      try {
        const response = await api.post('/api/users/reset_password/', { email: email })
        return response
      } catch (error) {
        throw error
      }
    }
  }
})
