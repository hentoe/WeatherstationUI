<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth.store'
import axios from 'axios'
import Navbar from './components/Navbar.vue'
import NavbarNoAuth from './components/NavbarNoAuth.vue'

export default {
  name: 'App',
  beforeCreate() {
    const authStore = useAuthStore()
    authStore.setToken(authStore.token)

    axios.defaults.headers.common['Authorization'] = authStore.isAuthenticated
      ? `Token ${authStore.token}`
      : ''
  }
}
</script>

<template>
  <!-- Navbar when logged out -->
  <NavbarNoAuth />
  <!-- Navbar when logged in -->
  <!-- <Navbar /> -->

  <RouterView />
</template>
