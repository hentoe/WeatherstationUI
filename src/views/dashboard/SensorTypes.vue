<template>
  <div>
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Sensor Types</h1>
      </div>
    </header>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <!-- Add New SensorType Form -->
      <div class="flex">
        <input
          v-model="newSensorTypeName"
          type="text"
          class="flex-1 py-3 px-2 rounded-l-md focus:outline-none"
          placeholder="New Sensor Type Name"
        />
        <input
          v-model="newSensorTypeUnit"
          type="text"
          class="flex-1 py-3 px-2 focus:outline-none"
          placeholder="Unit"
        />
        <button
          @click="addSensorType"
          class="cursor-pointer bg-black text-white px-4 rounded-r-md flex items-center"
        >
          <PlusIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Sensor Type List -->
      <ul class="mt-6">
        <div class="flex items-center justify-between mb-4">
          <h2>Show assigned Sensor Types only</h2>
          <Switch
            v-model="enabled"
            :class="enabled ? 'bg-gray-300' : 'bg-gray-500'"
            class="relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            <span class="sr-only">Show assigned Sensor Types only</span>
            <span
              aria-hidden="true"
              :class="enabled ? 'translate-x-5' : 'translate-x-0'"
              class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out translate-y-0.5"
            />
          </Switch>
        </div>
        <li
          v-for="sensor_type in weatherstationStore.sensor_types"
          :key="sensor_type.id"
          class="flex items-center justify-between py-2 border-t"
        >
          <span class="text-lg">{{ sensor_type.name }} - {{ sensor_type.unit }}</span>
          <div>
            <button @click="toggleUpdateModal(sensor_type)" class="mr-2">
              <PencilSquareIcon class="h-6 w-6" />
            </button>
            <button @click="toggleDeleteModal(sensor_type.id)">
              <TrashIcon class="h-6 w-6" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- Update Modal -->
  <UpdateSensorTypeModal
    :modalActive="updateModalActive"
    :sensor_type="selectedSensorType"
    @close-modal="closeUpdateModal"
    modalHeadline="Edit sensor type"
  />
  <!-- Delete Modal -->
  <DeleteModal
    :modalActive="deleteModalActive"
    @close-modal="toggleDeleteModal"
    @handle-delete="handleDelete"
    modalHeadline="Delete sensor type?"
    deleteMessage="Are you sure you want to delete this sensor type? This action cannot be undone!"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

import { PlusIcon, TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'

import DeleteModal from '@/components/DeleteModal.vue'
import UpdateSensorTypeModal from '@/components/UpdateSensorTypeModal.vue'

import { useWeatherstationStore } from '@/stores/weatherstation.store'

const weatherstationStore = useWeatherstationStore()

// For filtering by assigned sensor types
const enabled = ref(false)
watch(enabled, (newValue) => {
  weatherstationStore.fetchSensorTypes(newValue)
})

// Add sensor type.
const newSensorTypeName = ref('')
const newSensorTypeUnit = ref('')
const addSensorType = () => {
  if (newSensorTypeName.value.trim() !== '') {
    const newSensorType = {
      name: newSensorTypeName.value.trim(),
      unit: newSensorTypeUnit.value.trim()
    }
    weatherstationStore.addSensorType(newSensorType)

    newSensorTypeName.value = ''
  }
}
// Update Modal.
const updateModalActive = ref(false)
const selectedSensorType = ref(null)

const toggleUpdateModal = (sensor_type) => {
  selectedSensorType.value = sensor_type
  updateModalActive.value = !updateModalActive.value
}

const closeUpdateModal = () => {
  updateModalActive.value = false
  selectedSensorType.value = null
}

// Delete Modal.
const deleteModalActive = ref(false)
const itemId = ref(undefined)

const toggleDeleteModal = (sensor_typeId) => {
  deleteModalActive.value = !deleteModalActive.value
  itemId.value = sensor_typeId
}

const handleDelete = async () => {
  try {
    const id = itemId.value
    await weatherstationStore.deleteSensorType(id)
    toggleDeleteModal()
  } catch (error) {
    console.error('Error deleting sensor_type:', error)
  }
}
</script>
