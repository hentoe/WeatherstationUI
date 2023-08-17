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
        <li
          v-for="location in locations"
          :key="location.id"
          class="flex items-center justify-between py-2 border-t"
        >
          <span class="text-lg">{{ location.name }}</span>
          <div>
            <button @click="updateLocation(location.id)" class="mr-2">
              <WrenchIcon class="h-6 w-6" />
            </button>
            <button @click="toggleModal(location.id)">
              <TrashIcon class="h-6 w-6" />
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Delete Modal -->
    <DeleteModal
      :modalActive="modalActive"
      @close-modal="toggleModal"
      @handle-delete="handleDelete"
      modalHeadline="Delete location?"
      deleteMessage="Are you sure you want to delete this location? This action cannot be undone!"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

import { PlusIcon, TrashIcon, WrenchIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'

import DeleteModal from '../../components/DeleteModal.vue'

// API Call
const locations = ref([])
const enabled = ref(false)
watch(enabled, (newValue) => {
  fetchLocations(newValue)
})

onMounted(() => {
  fetchLocations(enabled.value)
})

const fetchLocations = async (assignedOnly) => {
  try {
    const apiUrl = `/api/weatherstation/locations${assignedOnly ? '?assigned_only=1' : ''}`
    const response = await axios.get(apiUrl)
    locations.value = response.data.map((item) => ({
      id: item.id,
      name: item.name
    }))
  } catch (error) {
    console.error('Error fetching locations:', error)
  }
}

// Add location.
const newLocationName = ref('')
const addLocation = () => {}

// Delete Modal.
const modalActive = ref(false)
const itemId = ref(undefined)

const toggleModal = (locationId) => {
  modalActive.value = !modalActive.value
  itemId.value = locationId
}

const handleDelete = async () => {
  try {
    await deleteLocation(itemId.value)
    toggleModal()
    window.location.reload()
  } catch (error) {
    console.error('Error deleting location:', error)
  }
}

const deleteLocation = async (id) => {
  const apiUrl = `/api/weatherstation/locations/${id}/`
  console.log(apiUrl)
  await axios.delete(apiUrl)
}
</script>
