<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-midnight dark:text-ice"
      >
        Send Activation Email again.
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
              class="block w-full rounded-md border-0 py-1.5 text-midnight shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-denim px-3 py-1.5 text-sm font-semibold leading-6 text-ice shadow-xs hover:bg-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denim"
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()

const router = useRouter()

const email = ref()
const errorMessage = ref(null)

const send_email = async () => {
  const response = await userStore.resendActivationEmail(email.value)

  if (response.status === 204) {
    // Handle success
    router.push({ name: 'activation-notice' })
  } else {
    // Handle activation email error
    if (response.status === 400 && response.data.email) {
      errorMessage.value = response.data.email[0]
    }
  }
}
</script>
