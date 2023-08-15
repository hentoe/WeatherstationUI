<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Locations</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="columns is-multiline">
        <div class="column is-12">
          <!-- Add client Button -->
          <PlusIcon class="h-10 w-10" />
        </div>

        <div class="column is-3 shadow" v-for="location in locations" v-bind:key="location.id">
          <div class="box">
            <h3 class="is-size-4 mb-4 flex items-center">
              {{ location.name }}
              <span class="ml-2"><WrenchIcon class="h-6 w-6" /></span>
            </h3>
          </div>
        </div>
      </div>
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
