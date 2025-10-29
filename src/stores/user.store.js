import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    is_staff: ''
  }),
  actions: {
    async fetchUserData() {
      try {
        const response = await axios.get('/api/users/me/')
        this.name = response.data.name
        this.email = response.data.email
        this.is_staff = response.data.is_staff
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    async updateUserName(newName) {
      try {
        const response = await axios.patch('/api/users/me/', { name: newName })
        this.name = response.data.name
        return response
      } catch (error) {
        throw error
      }
    },
    async updateEmail(newEmail, password) {
      try {
        const response = await axios.post('/api/users/set_email/', {
          new_email: newEmail,
          current_password: password
        })
        if ((response.status = 204)) {
          this.email = newEmail
        }
      } catch (error) {
        throw error
      }
    },
    async registerNewUser(newUser) {
      try {
        const response = await axios.post('/api/users/', newUser)
        this.name = response.data.name
        this.email = response.data.email
        return response
      } catch (error) {
        throw error
      }
    },
    async resendActivationEmail(email) {
      try {
        const response = await axios.post('/api/users/resend_activation/', { email: email })
        return response
      } catch (error) {
        throw error
      }
    },
    async recoverPassword(email) {
      try {
        const response = await axios.post('/api/users/reset_password/', { email: email })
        return response
      } catch (error) {
        throw error
      }
    }
  }
})
