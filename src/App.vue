<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth.store'
import axios from 'axios'
import NavbarComponent from './components/NavbarComponent.vue'
import NavbarNoAuth from './components/NavbarNoAuth.vue'

const authStore = useAuthStore()
authStore.setToken(authStore.token)

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
</script>

<template>
  <NavbarNoAuth v-if="!authStore.isAuthenticated" />
  <NavbarComponent v-else />

  <RouterView />
</template>
