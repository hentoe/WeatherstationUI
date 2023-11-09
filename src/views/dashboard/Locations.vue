<template>
  <div>
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Locations</h1>
      </div>
    </header>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <!-- Add Location Form -->
      <form @submit.prevent="addLocation">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Location Name</label>
          <input v-model="newLocationName" type="text" class="mt-1 p-2 w-full border rounded-md" />
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Location
        </button>
      </form>

      <!-- Location List -->
      <ul class="mt-6">
        <div class="flex items-center justify-between mb-4">
          <h2>Show assigned Locations only</h2>
          <Switch
            v-model="enabled"
            :class="enabled ? 'bg-gray-300' : 'bg-gray-500'"
            class="relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            <span class="sr-only">Show assigned locations only</span>
            <span
              aria-hidden="true"
              :class="enabled ? 'translate-x-5' : 'translate-x-0'"
              class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out translate-y-0.5"
            />
          </Switch>
        </div>
        <li
          v-for="location in weatherstationStore.locations"
          :key="location.id"
          class="flex items-center justify-between py-2 border-t"
        >
          <span class="text-lg">{{ location.name }}</span>
          <div>
            <button @click="openUpdateModal(location)" class="mr-2">
              <PencilSquareIcon class="h-6 w-6" />
            </button>
            <button @click="toggleDeleteModal(location.id)">
              <TrashIcon class="h-6 w-6" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- Update Modal -->
  <UpdateLocationModal
    :modalActive="updateModalActive"
    modalHeadline="Edit location"
    :location="selectedLocation"
    @close-modal="closeUpdateModal"
    @handle-update="handleUpdate"
  />
  <!-- Delete Modal -->
  <DeleteModal
    :modalActive="deleteModalActive"
    @close-modal="toggleDeleteModal"
    @handle-delete="handleDelete"
    modalHeadline="Delete location?"
    deleteMessage="Are you sure you want to delete this location? This action cannot be undone!"
  />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'

import DeleteModal from '@/components/DeleteModal.vue'
import UpdateLocationModal from '@/components/UpdateLocationModal.vue'

import { useWeatherstationStore } from '@/stores/weatherstation.store'

const weatherstationStore = useWeatherstationStore()

// API Call
const locations = ref([])

// For filtering by assigned locations
const enabled = ref(false)
watch(enabled, (newValue) => {
  weatherstationStore.fetchLocations(newValue)
})

onMounted(() => {
  weatherstationStore.fetchLocations()
})

// Add location.
const newLocationName = ref('')
const addLocation = () => {
  if (newLocationName.value.trim() !== '') {
    axios
      .post('/api/weatherstation/locations/', {
        name: newLocationName.value.trim()
      })
      .then((response) => {
        const newLocation = { id: response.data.id, name: response.data.name }
        updateLocationList(newLocation, 'add')
        // Placeholder for Success modal/message.
        console.log('Success')
        console.log(response.data)
      })
      .catch((error) => {
        // Placeholder for Fail message.
        console.log(error.code + ':', error.message)
      })

    newLocationName.value = ''
  }
}
// Update Modal.
const updateModalActive = ref(false)
const selectedLocation = ref(null)

const openUpdateModal = (location) => {
  selectedLocation.value = location
  updateModalActive.value = true
}
const closeUpdateModal = () => {
  updateModalActive.value = false
}
const handleUpdate = () => {
  console.log(selectedLocation.value.name)
}

// Delete Modal.
const deleteModalActive = ref(false)
const itemId = ref(undefined)

const toggleDeleteModal = (locationId) => {
  deleteModalActive.value = !deleteModalActive.value
  itemId.value = locationId
}

const handleDelete = async () => {
  try {
    const id = itemId.value
    await deleteLocation(id)
    updateLocationList({ id: id }, 'delete')
    toggleDeleteModal()
  } catch (error) {
    console.error('Error deleting location:', error)
  }
}

const deleteLocation = async (id) => {
  const apiUrl = `/api/weatherstation/locations/${id}/`
  console.log(apiUrl)
  await axios.delete(apiUrl)
}

// Update page content
const updateLocationList = (updatedLocation, action) => {
  switch (action) {
    case 'add':
      locations.value.push({ ...updatedLocation })
      break
    case 'update':
      const existingLocationIndex = locations.value.findIndex(
        (location) => location.id === updatedLocation.id
      )
      if (existingLocationIndex !== -1) {
        locations.value[existingLocationIndex] = { ...updatedLocation }
      }
      break
    case 'delete':
      console.log('Delete:', updatedLocation)
      locations.value = locations.value.filter((location) => location.id !== updatedLocation.id)
      break
  }
}
</script>
