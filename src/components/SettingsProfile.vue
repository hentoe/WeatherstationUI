<template>
  <div>
    <h2 class="text-base font-semibold leading-7 text-midnight dark:text-ice">Profile</h2>
    <p class="mt-1 text-sm leading-6 text-gray-500 dark:text-steel">
      This information won't be displayed publicly so no need to be careful what you share.
    </p>

    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          Full name
        </dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div v-if="!showUpdateUser" class="text-midnight dark:text-ice">
            {{ userData.name }}
          </div>
          <form v-if="showUpdateUser" class="flex gap-x-6">
            <div class="flex-col space-y-2">
              <div class="relative mt-2 rounded-md shadow-sm">
                <input
                  v-model="newName"
                  placeholder="Enter your name"
                  type="text"
                  class="bg-ice dark:bg-ocean text-midnight dark:text-ice block w-full ring-1 ring-inset ring-gray-300 rounded-md border-0 py-1.5 pr-10 sm:text-sm sm:leading-6 dark:placeholder:text-steel"
                  :class="{ 'ring-red-500 text-red-900': nameError.name }"
                />
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                  v-if="nameError.name"
                >
                  <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              </div>
              <p
                v-if="nameError.name"
                v-for="message in nameError.name"
                class="mt-2 text-sm text-red-600"
              >
                {{ message }}
              </p>
            </div>
            <button
              type="button"
              class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
              @click="updateUser"
              v-if="showUpdateUser"
            >
              Save
            </button>
          </form>
          <button
            type="button"
            class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
            @click="toggleUpdateUser"
            v-if="!showUpdateUser"
          >
            Update
          </button>

          <button
            type="button"
            class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
            @click="toggleUpdateUser"
            v-if="showUpdateUser"
          >
            Cancel
          </button>
        </dd>
      </div>
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          Email address
        </dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <form @submit.prevent="updateEmail" v-if="showUpdateEmail" class="flex gap-x-6">
            <div class="flex-col space-y-2">
              <div>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="email"
                    class="bg-ice dark:bg-ocean text-midnight dark:text-ice block w-full ring-1 ring-inset ring-gray-300 rounded-md border-0 py-1.5 pr-10 sm:text-sm sm:leading-6 dark:placeholder:text-steel"
                    :class="{ 'ring-red-500 text-red-900': emailError.new_email }"
                    v-model="newEmail"
                    placeholder="Enter new email"
                    autocomplete="email"
                  />
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    v-if="emailError.new_email"
                  >
                    <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                </div>
                <p
                  v-if="emailError.new_email"
                  v-for="message in emailError.new_email"
                  class="text-sm text-red-600"
                >
                  {{ message }}
                </p>
              </div>
              <div>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="password"
                    name="current_password"
                    id="current_password"
                    v-model="currentPassword"
                    class="bg-ice dark:bg-ocean text-midnight dark:text-ice block w-full ring-1 ring-inset ring-gray-300 rounded-md border-0 py-1.5 pr-10 sm:text-sm sm:leading-6 dark:placeholder:text-steel"
                    :class="{ 'ring-red-500 text-red-900': emailError.current_password }"
                    placeholder="Enter your password"
                    aria-invalid="error.current_password"
                  />
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    v-if="emailError.current_password"
                  >
                    <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                </div>
                <p
                  v-if="emailError.current_password"
                  v-for="message in emailError.current_password"
                  class="text-sm text-red-600"
                >
                  {{ message }}
                </p>
              </div>
            </div>

            <button
              type="submit"
              class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
            >
              Save
            </button>
          </form>
          <div v-if="!showUpdateEmail" class="text-midnight dark:text-ice">
            {{ userData.email }}
          </div>
          <button
            type="button"
            class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
            @click="toggleUpdateEmail"
            v-if="!showUpdateEmail"
          >
            Update
          </button>
          <button
            type="button"
            class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
            @click="toggleUpdateEmail"
            v-if="showUpdateEmail"
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
import { useUserStore } from '../stores/user.store'

import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

const userData = useUserStore()

const newName = ref(userData.name)
const newEmail = ref(userData.email)
const password = ref('')
const showUpdateUser = ref(false)
const showUpdateEmail = ref(false)
const emailError = ref({})
const nameError = ref({})

const toggleUpdateUser = () => {
  nameError.value = {}
  showUpdateUser.value = !showUpdateUser.value
}
const updateUser = async () => {
  nameError.value = {}
  try {
    await userData.updateUserName(newName.value)
    showUpdateUser.value = false
  } catch (err) {
    const errorData = err.response.data
    if (errorData.name) {
      nameError.value.name = errorData.name
    }
  }
}

const toggleUpdateEmail = () => {
  emailError.value = {}
  showUpdateEmail.value = !showUpdateEmail.value
}
const updateEmail = async () => {
  emailError.value = {}
  try {
    if (!newEmail.value || !password.value || newEmail.value == userData.email) {
      const data = {}
      if (!newEmail.value) {
        data.new_email = ['This field may not be blank.']
      }
      if (!password.value) {
        data.current_password = ['This field may not be blank.']
      }
      if (newEmail.value == userData.email) {
        data.new_email = ['You are already using this email.']
      }
      throw {
        response: {
          data: data
        }
      }
    }

    await userData.updateEmail(newEmail.value, password.value)
    newEmail.value = ''
    password.value = ''
    emailError.value = {}
    showUpdateEmail.value = false
  } catch (err) {
    if (err.response && err.response.data) {
      const errorData = err.response.data
      if (errorData.current_password) {
        emailError.value.current_password = errorData.current_password
      }
      if (errorData.new_email) {
        emailError.value.new_email = errorData.new_email
      }
    } else {
      emailError.value.non_field_errors = ['An unexpected error occurred.']
    }
  }
}
</script>
