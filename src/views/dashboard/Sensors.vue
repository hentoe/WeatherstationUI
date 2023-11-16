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
        <button type="submit" class="px-4 py-2 bg-black text-white rounded-md">Add Sensor</button>
      </RouterLink>

      <!-- Sensor List -->
      <ul class="mt-6">
        <li
          v-for="sensor in weatherstationStore.sensors"
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
import { ref, onMounted } from 'vue'
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import DeleteModal from '@/components/DeleteModal.vue'
import UpdateSensorModal from '@/components/UpdateSensorModal.vue'
import { useWeatherstationStore } from '@/stores/weatherstation.store'

const weatherstationStore = useWeatherstationStore()

onMounted(async () => {
  await weatherstationStore.fetchSensors()
  await weatherstationStore.fetchSensorTypes()
  await weatherstationStore.fetchLocations()
})

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
