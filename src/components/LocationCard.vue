<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg hover:opacity-75 shadow dark:bg-gray-800 dark:border-gray-700 m-4"
  >
    <div class="flex justify-end px-4 pt-4">
      <!-- Upper right corner -->
    </div>
    <div class="flex flex-col items-center pb-10">
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ location.name }}</h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">30 °C</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">45 %</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">998 hPa</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWeatherstationStore } from '../stores/weatherstation.store'

const weatherstationStore = useWeatherstationStore()

const props = defineProps({
  location: {
    type: Object,
    default: () => ({})
  }
})

onMounted(() => {
  const sensorsInLocation = weatherstationStore.getSensorsByLocationId(props.location.id)
  console.log('Sensors by Location', props.location.id, 'Sensors: ', sensorsInLocation)
})
</script>

<style scoped></style>
