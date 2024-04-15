<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-midnight dark:text-ice"
      >
        Recover your password
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- Form -->
      <form class="space-y-6" @submit.prevent="send_email">
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
              class="block w-full rounded-md border-0 py-1.5 text-midnight shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div>
            <span v-if="errorMessageActive" class="mt-2 flex items-center text-red-600">
              <span><ExclamationCircleIcon class="h-5" /></span>
              <span class="ml-2">{{ errorMessage }}</span>
            </span>
          </div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-denim px-3 py-1.5 text-sm font-semibold leading-6 text-ice shadow-sm hover:bg-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denim"
          >
            Recover password
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <RouterLink
          :to="{ name: 'login' }"
          class="font-semibold leading-6 text-ocean dark:text-ice hover:text-steel"
          >Sign in here.</RouterLink
        >
      </p>

      <p class="text-center text-sm text-gray-500">
        Not a member?
        <RouterLink
          :to="{ name: 'password-reset' }"
          class="font-semibold leading-6 text-ocean dark:text-ice hover:text-steel"
          >Register here.</RouterLink
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

const userStore = useUserStore()

const router = useRouter()

const email = ref()
const errorMessage = ref(null)
const errorMessageActive = ref(null)

const send_email = async () => {
  const response = await userStore.recoverPassword(email.value)

  if (response.status === 204) {
    // Handle success
    router.push({ name: 'password-reset-notice' })
  } else {
    // Handle activation email error
    if (response.status === 400 && response.data.email) {
      errorMessage.value = response.data.email[0]
    }
  }
}
</script>
