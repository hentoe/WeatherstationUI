<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg hover:opacity-75 shadow dark:bg-gray-800 dark:border-gray-700 m-4"
  >
    <div class="flex justify-end px-4 pt-4">
      <!-- Upper right corner -->
    </div>
    <div class="flex flex-col items-center pb-10">
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ location.name }}</h5>
      <!-- Display latest data of sensors in sensorsInLocation -->
      <span
        v-for="measurement in measurements"
        :key="measurement.id"
        class="text-sm text-gray-500 dark:text-gray-400"
        >{{ measurement.sensor.sensor_type.name }} {{ measurement.value }}
        {{ measurement.sensor.sensor_type.unit }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useWeatherstationStore } from '../stores/weatherstation.store'

const weatherstationStore = useWeatherstationStore()

let sensorsInLocation = ref([])
let measurements = ref([])

// Create a computed property to get the list of sensor IDs
const sensorIds = computed(() => {
  return sensorsInLocation.value.map((sensor) => sensor.id)
})

const props = defineProps({
  location: {
    type: Object,
    default: () => ({})
  }
})

onMounted(async () => {
  sensorsInLocation.value = weatherstationStore.getSensorsByLocationId(props.location.id)
  measurements.value = await weatherstationStore.fetchMeasurements(
    null,
    1,
    sensorIds.value.join(',')
  )
})
</script>

<style scoped></style>
