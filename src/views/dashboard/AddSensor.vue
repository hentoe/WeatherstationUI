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

      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Add Sensor</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Add Sensor
const newSensorName = ref('')
const addSensor = () => {
  if (newSensorName.value.trim() !== '') {
    axios
      .post('/api/weatherstation/sensors/', {
        name: newSensorName.value.trim()
      })
      .then((response) => {
        router.push({ name: 'Sensors' })
      })
      .catch((error) => {
        // Placeholder for Fail message.
        console.log(error.code + ':', error.message)
      })
  }
}
</script>
