<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Locations</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-xl px-4 py-6 sm:px-6 lg:px-8">
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="location in locations"
          :key="location.name"
          class="flex justify-between gap-x-6 py-5"
        >
          <div class="flex min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">{{ location.name }}</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ location.id }}</p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900"><WrenchIcon class="h-6 w-6" /></p>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { PlusIcon, WrenchIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'

const locations = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('/api/weatherstation/locations')
    locations.value = response.data.map((item) => ({
      id: item.id,
      name: item.name
    }))
  } catch (error) {
    console.error('Error fetching locations:', error)
  }
})
</script>

<style lang="scss" scoped></style>
