<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-midnight dark:text-ice"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- Form -->
      <form class="space-y-6" @submit.prevent="login">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-midnight dark:text-ice"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="block w-full rounded-md border-0 py-1.5 text-midnight shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-midnight focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-midnight dark:text-ice"
              >Password</label
            >
            <div class="text-sm">
              <RouterLink
                :to="{ name: 'password-reset' }"
                class="font-semibold text-ocean dark:text-ice hover:text-steel"
                >Forgot password?</RouterLink
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span v-if="errorMessageActive" class="mt-2 flex items-center text-red-600">
            <span><ExclamationCircleIcon class="h-5" /></span>
            <span class="ml-2">{{ errorMessage }}</span>
          </span>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-denim px-3 py-1.5 text-sm font-semibold leading-6 text-ice shadow-xs hover:bg-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denim"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <RouterLink
          :to="{ name: 'register' }"
          class="font-semibold leading-6 text-ocean dark:text-ice hover:text-steel"
          >Register here.</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth.store'
import axios from 'axios'

import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessageActive: false,
      errorMessage: 'Wrong email or password'
    }
  },
  components: { ExclamationCircleIcon },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/users/login/', {
          email: this.email,
          password: this.password
        })
        const token = response.data.token
        const expiry = response.data.expiry

        useAuthStore().setToken(token, expiry)

        this.$router.push('/')
      } catch (error) {
        this.errorMessage = error.response.data.non_field_errors[0]
        this.toggleErrorMessage()
      }
    },
    toggleErrorMessage() {
      this.errorMessageActive = !this.errorMessageActive
    }
  }
}
</script>
