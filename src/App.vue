<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth.store'
import NavbarComponent from './components/NavbarComponent.vue'
import NavbarNoAuth from './components/NavbarNoAuth.vue'

const authStore = useAuthStore()
</script>

<template>
  <NavbarNoAuth v-if="!authStore.isAuthenticated" />
  <NavbarComponent v-else />

  <RouterView />
</template>
