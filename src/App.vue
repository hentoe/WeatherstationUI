<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import NavbarNoAuth from './components/NavbarNoAuth.vue'
</script>

<template>
  <!-- Navbar when logged out -->
  <NavbarNoAuth />
  <!-- Navbar when logged in -->
  <!-- <Navbar /> -->

  <RouterView />
</template>
