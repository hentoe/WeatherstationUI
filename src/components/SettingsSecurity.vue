<template>
  <div>
    <h2 class="text-base font-semibold leading-7 text-midnight dark:text-ice">Security</h2>
    <p class="mt-1 text-sm leading-6 text-gray-500 dark:text-steel">Change your password.</p>

    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          Password
        </dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-midnight dark:text-ice">
            <p v-if="setPasswordSuccess" class="text-green-500">Password changed successfully.</p>
            <form @submit.prevent="updatePassword" v-if="showUpdatePassword">
              <div>
                <label
                  for="current_password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Current Password</label
                >
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="password"
                    name="current_password"
                    id="current_password"
                    v-model="currentPassword"
                    class="block w-full ring-1 ring-inset ring-gray-300 rounded-md border-0 py-1.5 pr-10 sm:text-sm sm:leading-6"
                    :class="{ 'ring-red-500 text-red-900': error.current_password }"
                    placeholder=""
                    aria-invalid="error.current_password"
                  />
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    v-if="error.current_password"
                  >
                    <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                </div>
                <p
                  v-if="error.current_password"
                  v-for="message in error.current_password"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ message }}
                </p>
              </div>

              <div>
                <label for="new_password" class="block text-sm font-medium leading-6 text-gray-900"
                  >New Password</label
                >
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="password"
                    name="new_password"
                    id="new_password"
                    v-model="newPassword"
                    class="block w-full ring-1 ring-inset ring-gray-300 rounded-md border-0 py-1.5 pr-10 sm:text-sm sm:leading-6"
                    :class="{ 'ring-red-500 text-red-900': error.new_password }"
                    placeholder=""
                    aria-invalid="true"
                  />
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    v-if="error.new_password"
                  >
                    <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                </div>
                <p
                  v-if="error.new_password"
                  v-for="message in error.new_password"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ message }}
                </p>
              </div>

              <div>
                <label
                  for="re_new_password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Confirm New Password</label
                >
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="password"
                    name="re_new_password"
                    id="re_new_password"
                    v-model="reNewPassword"
                    class="block w-full ring-1 ring-inset ring-gray-300 rounded-md border-0 py-1.5 pr-10 sm:text-sm sm:leading-6"
                    :class="{ 'ring-red-500 text-red-900': error.re_new_password }"
                    placeholder=""
                    aria-invalid="true"
                    aria-describedby="email-error"
                  />
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    v-if="error.re_new_password"
                  >
                    <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                </div>
                <p
                  v-if="error.re_new_password"
                  v-for="message in error.re_new_password"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ message }}
                </p>
                <p
                  v-if="error.non_field_errors"
                  v-for="message in error.non_field_errors"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ message }}
                </p>
              </div>
              <button
                type="submit"
                class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
              >
                Save
              </button>
            </form>
          </div>
          <button
            type="button"
            class="font-semibold text-denim dark:text-steel hover:text-ocea"
            @click="toggleUpdatePassword"
            v-if="!showUpdatePassword"
          >
            Update
          </button>

          <button
            type="button"
            class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
            @click="toggleUpdatePassword"
            v-if="showUpdatePassword"
          >
            Cancel
          </button>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'

import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

const authStore = useAuthStore()

const showUpdatePassword = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const reNewPassword = ref('')
const error = ref({})
const setPasswordSuccess = ref(false)

const toggleUpdatePassword = () => {
  showUpdatePassword.value = !showUpdatePassword.value
  currentPassword.value = ''
  newPassword.value = ''
  reNewPassword.value = ''
  setPasswordSuccess.value = false
  error.value = {}
}
const updatePassword = async () => {
  error.value = {}

  if (newPassword.value !== reNewPassword.value) {
    error.value.re_new_password = ['New passwords do not match.']
    return
  }

  try {
    await authStore.setPassword(currentPassword.value, newPassword.value, reNewPassword.value)
    setPasswordSuccess.value = true
    showUpdatePassword.value = false
  } catch (err) {
    if (err.response && err.response.data) {
      const errorData = err.response.data
      if (errorData.current_password) {
        error.value.current_password = errorData.current_password
      }
      if (errorData.new_password) {
        error.value.new_password = errorData.new_password
      }
      if (errorData.re_new_password) {
        error.value.re_new_password = errorData.re_new_password
      }
      if (errorData.non_field_errors) {
        error.value.non_field_errors = errorData.non_field_errors
      }
    } else {
      error.value.non_field_errors = ['An unexpected error occurred.']
    }
  }
}
</script>
