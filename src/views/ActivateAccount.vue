<template>
  <div>
    <p v-if="activationStatus === 'success'">Your account has been successfully activated.</p>
    <p v-if="activationStatus === 'error'">Failed to activate account. Please try again.</p>
  </div>
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
    console.error('Activation error:', error)
    activationStatus.value = 'error'
  }
}
</script>
