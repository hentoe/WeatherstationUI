<template>
  <header class="bg-ice dark:bg-midnight shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-midnight dark:text-ice">My Account</h1>
    </div>
  </header>

  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-midnight dark:text-ice">
    <div class="px-4 sm:px-0">
      <p class="mt-1 max-w-2xl text-sm leading-6">Personal details.</p>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6">Full name</dt>
          <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            {{ userData.name }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6">Email address</dt>
          <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            {{ userData.email }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../../stores/user.store'

const userData = useUserStore()
</script>
