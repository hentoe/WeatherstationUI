<template>
  <div>
    <header class="bg-ice dark:bg-midnight shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-midnight dark:text-ice">Sensors</h1>
      </div>
    </header>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <!-- Add Sensor -->
      <RouterLink
        :to="{ name: 'AddSensor' }"
        class="px-4 py-2 bg-denim dark:bg-ocean hover:bg-ocean dark:hover:bg-denim text-ice rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denim"
      >
        Add Sensor
      </RouterLink>

      <!-- Sensor List -->
      <ul class="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
        <li v-for="sensor in weatherstationStore.sensors" :key="sensor.id" class="py-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-midnight dark:text-ice">{{ sensor.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                ID: <span class="font-semibold">{{ sensor.id }}</span>
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Location:
                <span class="font-semibold">{{
                  sensor.location ? sensor.location.name : '-'
                }}</span>
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Type:
                <span class="font-semibold">{{
                  sensor.sensor_type ? sensor.sensor_type.name : '-'
                }}</span>
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="openUpdateModal(sensor)"
                class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <PencilSquareIcon class="h-6 w-6 text-denim dark:text-steel" aria-hidden="true" />
                <span class="sr-only">Edit {{ sensor.name }}</span>
              </button>
              <button
                @click="toggleDeleteModal(sensor.id)"
                class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <TrashIcon class="h-6 w-6 text-denim dark:text-steel" aria-hidden="true" />
                <span class="sr-only">Delete {{ sensor.name }}</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- Update Sensor Modal -->
  <UpdateSensorModal
    :modalActive="updateModalActive"
    :sensor="selectedSensor"
    @close-modal="closeUpdateModal"
    modalHeadline="Edit sensor"
  />

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
import { ref } from 'vue'
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import DeleteModal from '@/components/DeleteModal.vue'
import UpdateSensorModal from '@/components/UpdateSensorModal.vue'
import { useWeatherstationStore } from '@/stores/weatherstation.store'

const weatherstationStore = useWeatherstationStore()

// Update Modal.
const updateModalActive = ref(false)
const selectedSensor = ref(null)

const openUpdateModal = async (sensor) => {
  try {
    await weatherstationStore.fetchSensorDetail(sensor.id)
    const detailedSensor = weatherstationStore.getSensorById(sensor.id)
    selectedSensor.value = detailedSensor
    updateModalActive.value = true
  } catch (error) {
    console.error('Error fetching sensor details:', error)
  }
}

const closeUpdateModal = () => {
  updateModalActive.value = false
  selectedSensor.value = null
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
    await weatherstationStore.deleteSensor(id)
    toggleDeleteModal()
  } catch (error) {
    console.error('Error deleting sensor:', error)
  }
}
</script>
