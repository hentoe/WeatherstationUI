<template>
  <Disclosure as="nav" class="bg-ocean dark:bg-midnight">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="{ name: item.href }"
                :class="[
                  $route.name === item.href
                    ? 'bg-denim text-white dark:bg-ocean dark:text-ice'
                    : 'text-ice hover:bg-denim hover:text-white dark:text-ice dark:hover:bg-ocean',
                  'rounded-md px-3 py-2 text-sm font-medium'
                ]"
                :aria-current="$route.name === item.href ? 'page' : undefined"
                >{{ item.name }}</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure } from '@headlessui/vue'

const navigation = [
  { name: 'Login', href: 'login' },
  { name: 'Register', href: 'register' }
]
</script>
