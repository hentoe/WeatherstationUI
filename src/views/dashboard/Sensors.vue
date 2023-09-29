<template>
  <div>
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Sensors</h1>
      </div>
    </header>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <!-- Add Sensor -->
      <RouterLink :to="{ name: 'AddSensor' }">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Sensor
        </button>
      </RouterLink>

      <!-- Sensor List -->
      <ul class="mt-6">
        <li
          v-for="sensor in sensorStore.sensors"
          :key="sensor.id"
          class="flex items-center justify-between py-2 border-t"
        >
          <span class="text-lg">{{ sensor.name }}</span>
          <div>
            <button @click="openUpdateModal(sensor)" class="mr-2">
              <PencilSquareIcon class="h-6 w-6" />
            </button>
            <button @click="toggleDeleteModal(sensor.id)">
              <TrashIcon class="h-6 w-6" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Delete Modal -->
  <DeleteModal
    :modalActive="deleteModalActive"
    @close-modal="toggleDeleteModal"
    @handle-delete="handleDelete"
    modalHeadline="Delete sensor?"
    deleteMessage="Are you sure you want to delete this sensor? This action cannot be undone!"
  />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

import { PlusIcon, TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

import DeleteModal from '../../components/DeleteModal.vue'
import { useSensorStore } from '../../stores/sensor.store'

// API Call
const sensorStore = useSensorStore()
const sensors = ref([])
const enabled = ref(false)

watch(enabled, (newValue) => {
  fetchSensors(newValue)
})

onMounted(async () => {
  await sensorStore.fetchSensors()
})

const fetchSensors = async (assignedOnly) => {
  try {
    const apiUrl = `/api/weatherstation/sensors${assignedOnly ? '?assigned_only=1' : ''}`
    const response = await axios.get(apiUrl)
    sensors.value = response.data.map((item) => ({
      id: item.id,
      name: item.name
    }))
  } catch (error) {
    console.error('Error fetching sensors:', error)
  }
}

// Delete Modal.
const deleteModalActive = ref(false)
const itemId = ref(undefined)

const toggleDeleteModal = (sensorId) => {
  deleteModalActive.value = !deleteModalActive.value
  itemId.value = sensorId
}

const handleDelete = async () => {
  try {
    const id = itemId.value
    await deleteSensor(id)
    updateSensorList({ id: id }, 'delete')
    toggleDeleteModal()
  } catch (error) {
    console.error('Error deleting sensor:', error)
  }
}

const deleteSensor = async (id) => {
  const apiUrl = `/api/weatherstation/sensors/${id}/`
  console.log(apiUrl)
  await axios.delete(apiUrl)
}

// Update page content
const updateSensorList = (updatedSensor, action) => {
  switch (action) {
    case 'add':
      sensors.value.push({ ...updatedSensor })
      break
    case 'update':
      const existingSensorIndex = sensors.value.findIndex(
        (sensor) => sensor.id === updatedSensor.id
      )
      if (existingSensorIndex !== -1) {
        sensors.value[existingSensorIndex] = { ...updatedSensor }
      }
      break
    case 'delete':
      console.log('Delete:', updatedSensor)
      sensors.value = sensors.value.filter((sensor) => sensor.id !== updatedSensor.id)
      break
  }
}
</script>
