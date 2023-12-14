<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
    </div>
  </header>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div class="m-4 flex flex-wrap justify-center">
      <LocationCard
        v-for="location in weatherstationStore.locations"
        :key="location.id"
        :location="location"
      ></LocationCard>
    </div>
  </div>
</template>

<script setup>
import { useWeatherstationStore } from '@/stores/weatherstation.store'
import LocationCard from '@/components/LocationCard.vue'

const weatherstationStore = useWeatherstationStore()
</script>
