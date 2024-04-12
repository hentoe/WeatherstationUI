<template>
  <div
    v-if="activationStatus === ''"
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Recover your password
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- Form -->
      <form class="space-y-6" @submit.prevent="resetPassword">
        <div>
          <label for="new_password" class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
          <input
            id="new_password"
            name="new_password"
            type="password"
            required
            v-model="payload.new_password"
            class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <label for="re_password" class="mt-4 block text-sm font-medium leading-6 text-gray-900"
            >Confirm Password</label
          >
          <div class="mt-2">
            <input
              id="re_new_password"
              name="re_new_password"
              type="password"
              autocomplete="current-password"
              required
              v-model="payload.re_new_password"
              class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="text-center">
    <p class="mt-6 text-base leading-7 text-green-300" v-if="activationStatus === 'success'">
      Your password has been reset.
    </p>
    <p class="mt-6 text-base leading-7 text-red-600" v-if="activationStatus === 'error'">
      Failed to reset password. Please try again.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const payload = ref({
  new_password: '',
  re_new_password: '',
  uid: '',
  token: ''
})

const activationStatus = ref('')
const errorMessage = ref('')
const errorMessageActive = ref(false)

onMounted(() => {
  payload.value.uid = route.query.uid
  payload.value.token = route.query.token
})

async function resetPassword() {
  if (payload.value.new_password !== payload.value.re_new_password) {
    errorMessage.value = 'Passwords do not match.'
    errorMessageActive.value = true
    return
  }

  try {
    await axios.post('/api/users/reset_password_confirm/', payload.value)
    activationStatus.value = 'success'
  } catch (error) {
    activationStatus.value = 'error'
    errorMessage.value = error.response?.data?.detail || 'An error occurred.'
    errorMessageActive.value = true
  }
}
</script>
