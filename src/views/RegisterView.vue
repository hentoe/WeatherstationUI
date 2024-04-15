<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-midnight dark:text-ice"
      >
        Create an account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- Form -->
      <form class="space-y-6 text-midnight dark:text-ice" @submit.prevent="register">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-midnight dark:text-ice"
            >Name</label
          >
          <div class="mt-2">
            <input
              id="name"
              v-model="newUser.name"
              name="name"
              type="text"
              required
              class="block w-full rounded-md border-0 py-1.5 text-midnight dark:text-ice shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              v-model="newUser.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-steel focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span v-if="errorMessageEmail" class="mt-2 flex items-center text-red-600">
            <span><ExclamationCircleIcon class="h-5" /></span>
            <span class="ml-2">{{ errorMessageEmail }}</span>
          </span>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6">Password</label>
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="newUser.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="re_password" class="block text-sm font-medium leading-6"
              >Confirm Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="re_password"
              v-model="newUser.re_password"
              name="re_password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span v-if="errorMessage" class="mt-2 flex items-center text-red-600">
            <span><ExclamationCircleIcon class="h-5" /></span>
            <span class="ml-2">{{ errorMessage }}</span>
          </span>
          <span v-if="errorMessagePassword" class="mt-2 flex items-center text-red-600">
            <span><ExclamationCircleIcon class="h-5" /></span>
            <span class="ml-2">{{ errorMessagePassword }}</span>
          </span>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <RouterLink
          :to="{ name: 'login' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Sign in here.</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user.store'

import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const errorMessage = ref(null)
const errorMessageEmail = ref(null)
const errorMessagePassword = ref(null)

const newUser = ref({
  name: '',
  email: '',
  password: '',
  re_password: ''
})

const router = useRouter()
const userStore = useUserStore()

const register = async () => {
  try {
    if (newUser.value.password !== newUser.value.re_password) {
      errorMessagePassword.value = 'Passwords do not match!'
      return
    }

    // Make API request to register the user
    const response = await userStore.registerNewUser({
      name: newUser.value.name,
      email: newUser.value.email,
      password: newUser.value.password,
      re_password: newUser.value.re_password
    })

    // Check the response from the server
    if (response.status === 201) {
      // Handle successful registration (e.g., redirect to login page)
      router.push({ name: 'activation-notice' })
    } else {
      // Handle registration error
      if (response.status === 400 && response.data.email) {
        errorMessageEmail.value = response.data.email[0]
      }
      if (response.status === 400 && response.data.password) {
        errorMessagePassword.value = response.data.password[0]
      }
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred'
  }
}
</script>
