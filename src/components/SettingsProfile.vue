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
          <div v-if="showUpdateUser" class="text-midnight dark:text-ice">
            <input
              v-model="newName"
              :placeholder="userData.name"
              type="text"
              class="rounded-md bg-ice dark:bg-ocean text-midnight dark:text-ice dark:placeholder:text-stell"
            />
          </div>
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
            @click="updateUser"
            v-if="showUpdateUser"
          >
            Save
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
          <form @submit.prevent="updateEmail" v-if="showUpdateEmail" class="flex">
            <div class="flex-col space-y-2">
              <input
                type="email"
                class="rounded-md bg-ice dark:bg-ocean text-midnight dark:text-ice dark:placeholder:text-stell"
                :class="{ 'bg-red-200 text-red-900': error.new_email }"
                v-model="newEmail"
                placeholder="Enter new email"
                autocomplete="email"
              />
              <p
                v-if="error.new_email"
                v-for="message in error.new_email"
                class="mt-2 text-sm text-red-600"
              >
                {{ message }}
              </p>
              <input
                type="password"
                class="rounded-md bg-ice dark:bg-ocean text-midnight dark:text-ice dark:placeholder:text-stell"
                :class="{ 'bg-red-200 text-red-900': error.current_password }"
                placeholder="Enter password"
                v-model="password"
              />
              <p
                v-if="error.current_password"
                v-for="message in error.current_password"
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
const userData = useUserStore()

const newName = ref(userData.name)
const newEmail = ref(userData.email)
const password = ref('')
const showUpdateUser = ref(false)
const showUpdateEmail = ref(false)
const error = ref({})

const toggleUpdateUser = () => {
  showUpdateUser.value = !showUpdateUser.value
}
const updateUser = () => {
  userData.updateUserName(newName.value)
  showUpdateUser.value = false
}

const toggleUpdateEmail = () => {
  showUpdateEmail.value = !showUpdateEmail.value
}
const updateEmail = async () => {
  error.value = {}
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
    error.value = {}
    showUpdateEmail.value = false
  } catch (err) {
    if (err.response && err.response.data) {
      const errorData = err.response.data
      if (errorData.current_password) {
        error.value.current_password = errorData.current_password
      }
      if (errorData.new_email) {
        error.value.new_email = errorData.new_email
      }
    } else {
      error.value.non_field_errors = ['An unexpected error occurred.']
    }
  }
}
</script>
