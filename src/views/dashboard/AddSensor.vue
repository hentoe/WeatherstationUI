<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Add Sensor</h1>
    </div>
  </header>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <form @submit.prevent="addSensor">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Sensor Name</label>
        <input v-model="newSensorName" type="text" class="mt-1 p-2 w-full border rounded-md" />
      </div>
      <div class="mb-4">
        <label for="sensorLocation">Location</label>
        <select
          v-model="newSensorLocation"
          id="sensorLocation"
          name="location"
          class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none focus:border-blue-300"
        >
          <option disabled value="">Please select a location</option>
          <option
            v-for="location in weatherstationStore.getAllLocations"
            :key="location.id"
            :value="location.id"
          >
            {{ location.name }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="newSensorDescription"
          type="text"
          class="mt-1 p-2 w-full border rounded-md"
          placeholder="optional"
        >
        </textarea>
      </div>

      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Add Sensor</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWeatherstationStore } from '@/stores/weatherstation.store'

const weatherstationStore = useWeatherstationStore()

const router = useRouter()

// Add Sensor
const newSensorName = ref('')
// const newSensorType = ref('')
const newSensorLocation = ref('')
const newSensorDescription = ref('')

const addSensor = async () => {
  if (newSensorName.value.trim() !== '') {
    const newSensor = {
      name: newSensorName.value.trim(),
      description: newSensorDescription.value.trim()
    }
    if (newSensorLocation.value !== '') {
      newSensor.location = weatherstationStore.getLocationById(newSensorLocation.value)
    }

    try {
      await weatherstationStore.addSensor(newSensor)
      router.push({ name: 'Sensors' })
    } catch (error) {
      console.error('Error creating new Sensor:', error)
    }
  }
}
</script>
