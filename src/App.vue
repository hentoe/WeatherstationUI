<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth.store'
import axios from 'axios'
import NavbarComponent from './components/NavbarComponent.vue'
import NavbarNoAuth from './components/NavbarNoAuth.vue'

const router = useRouter()

const authStore = useAuthStore()
authStore.setToken(authStore.token, authStore.expiry)

axios.interceptors.request.use(
  (config) => {
    if (authStore.isAuthenticated) {
      config.headers.Authorization = `Token ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.detail === 'Invalid token.'
    ) {
      authStore.clearToken()
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)
</script>

<template>
  <NavbarNoAuth v-if="!authStore.isAuthenticated" />
  <NavbarComponent v-else />

  <RouterView />
</template>
