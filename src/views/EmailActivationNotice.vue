<template>
  <main
    class="grid min-h-full place-items-center bg-ice dark:bg-midnight px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <p class="my-6 text-base leading-7 text-ocean dark:text-steel">
        We've emailed you instructions for activating your account. If they haven't arrived in a few
        minutes, check your spam folder.
      </p>
      <RouterLink
        :to="{ name: 'resend-activation-email' }"
        class="font-semibold leading-6 text-midnight hover:text-denim dark:text-steel dark:hover:text-ice"
        >No email received?</RouterLink
      >
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
