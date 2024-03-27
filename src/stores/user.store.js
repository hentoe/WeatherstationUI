import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: ''
  }),
  actions: {
    async fetchUserData() {
      try {
        const response = await axios.get('/api/users/me/')
        this.name = response.data.name
        this.email = response.data.email
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    async registerNewUser(newUser) {
      try {
        const response = await axios.post('/api/users/', newUser)
        this.name = response.data.name
        this.email = response.data.email
        return response
      } catch (error) {
        console.error('Error registering new user.')
        console.log(error.response)
        return error.response
      }
    },
    async resendActivationEmail(email) {
      try {
        const response = await axios.post('/api/users/resend_activation/', { email: email })
        return response
      } catch (error) {
        console.error('Error registering new user.')
        console.log(error.response)
        return error.response
      }
    }
  }
})
