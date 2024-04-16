<template>
  <header class="bg-ice dark:bg-midnight shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-midnight dark:text-ice">Add Sensor</h1>
    </div>
  </header>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <form @submit.prevent="addSensor">
      <div class="mb-4 text-midnight dark:text-ice">
        <label class="block text-sm font-medium">Sensor Name</label>
        <input
          v-model="newSensorName"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:ring-blue-200 focus:outline-none focus:border-blue-300 bg-ice dark:bg-steel"
        />
      </div>
      <div class="mb-4 text-midnight dark:text-ice">
        <label for="sensorLocation">Location</label>
        <select
          v-model="newSensorLocation"
          id="sensorLocation"
          name="location"
          class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none focus:border-blue-300 bg-ice dark:bg-steel"
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

      <div class="mb-4 text-midnight dark:text-ice">
        <label for="sensorType">Sensor Type</label>
        <select
          v-model="newSensorType"
          id="sensorType"
          name="sensortype"
          class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none focus:border-blue-300 bg-ice dark:bg-steel"
        >
          <option disabled value="">Please select a sensor type</option>
          <option
            v-for="sType in weatherstationStore.getAllSensorTypes"
            :key="sType.id"
            :value="sType.id"
          >
            {{ sType.name }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-midnight dark:text-ice">Description</label>
        <textarea
          v-model="newSensorDescription"
          type="text"
          class="mt-1 p-2 w-full border rounded-md text-midnight dark:text-ice focus:ring-blue-200 focus:outline-none focus:border-blue-300 bg-ice dark:bg-steel"
          placeholder="optional"
        >
        </textarea>
      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-denim dark:bg-ocean hover:bg-ocean dark:hover:bg-denim text-ice rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denim"
      >
        Add Sensor
      </button>
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
const newSensorType = ref('')
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
    if (newSensorType.value !== '') {
      newSensor.sensor_type = weatherstationStore.getSensorTypeById(newSensorType.value)
    }

    try {
      await weatherstationStore.addSensor(newSensor)
      router.push({ name: 'SensorView' })
    } catch (error) {
      console.error('Error creating new Sensor:', error)
    }
  }
}
</script>
