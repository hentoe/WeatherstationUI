<template>
  <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="mt-6 text-base leading-7 text-gray-600">
        We've emailed you instructions for recovering your account. If they haven't arrived in a few
        minutes, check your spam folder.
      </p>
      <RouterLink
        :to="{ name: 'password-reset' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >No email received?</RouterLink
      >
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
