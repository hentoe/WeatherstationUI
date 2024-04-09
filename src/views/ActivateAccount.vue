<template>
  <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="mt-6 text-base leading-7 text-green-300" v-if="activationStatus === 'success'">
        Your account has been successfully activated.
      </p>
      <p class="mt-6 text-base leading-7 text-red-600" v-if="activationStatus === 'error'">
        Failed to activate account. Please try again.
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const activationStatus = ref('')

onMounted(async () => {
  await activateAccount()
})

async function activateAccount() {
  const uid = route.query.uid
  const token = route.query.token

  try {
    await axios.post('/api/users/activation/', { uid, token })
    activationStatus.value = 'success'
  } catch (error) {
    activationStatus.value = 'error'
  }
}
</script>
