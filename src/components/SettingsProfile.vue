<template>
  <div>
    <h2 class="text-base font-semibold leading-7 text-midnight dark:text-ice">Profile</h2>
    <p class="mt-1 text-sm leading-6 text-gray-500 dark:text-steel">
      This information won't be displayed publicly so no need to be careful what you share.
    </p>

    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          Full name
        </dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-midnight dark:text-ice">{{ userData.name }}</div>
          <button
            type="button"
            class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
          >
            Update
          </button>
        </dd>
      </div>
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          Email address
        </dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-midnight dark:text-ice">{{ userData.email }}</div>
          <button
            type="button"
            class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
          >
            Update
          </button>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user.store'
const userData = useUserStore()
</script>
