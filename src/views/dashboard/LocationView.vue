<template>
  <div>
    <header class="bg-ice dark:bg-midnight shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-midnight dark:text-ice">Locations</h1>
      </div>
    </header>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <!-- Add New Location Form -->
      <div class="flex">
        <input
          v-model="newLocationName"
          type="text"
          class="flex-1 py-3 px-2 rounded-l-md focus:ring-blue-200 focus:outline-none focus:border-blue-300 bg-ice dark:bg-steel text-midnight dark:text-ice"
          placeholder="New Location"
        />
        <button
          @click="addLocation"
          class="cursor-pointer bg-denim dark:bg-ocean hover:bg-ocean dark:hover:bg-denim text-ice px-4 rounded-r-md flex items-center"
        >
          <PlusIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Location List -->
      <ul class="mt-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-midnight dark:text-ice">Show assigned Locations only</h2>
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
          <span class="text-lg text-midnight dark:text-ice">{{ location.name }}</span>
          <div>
            <button @click="toggleUpdateModal(location)" class="mr-2">
              <PencilSquareIcon class="h-6 w-6 text-denim dark:text-steel" />
            </button>
            <button @click="toggleDeleteModal(location.id)">
              <TrashIcon class="h-6 w-6 text-denim dark:text-steel" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- Update Modal -->
  <UpdateLocationModal
    :modalActive="updateModalActive"
    :location="selectedLocation"
    @close-modal="closeUpdateModal"
    modalHeadline="Edit location"
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
import { ref, watch } from 'vue'

import { PlusIcon, TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'

import DeleteModal from '@/components/DeleteModal.vue'
import UpdateLocationModal from '@/components/UpdateLocationModal.vue'

import { useWeatherstationStore } from '@/stores/weatherstation.store'

const weatherstationStore = useWeatherstationStore()

// For filtering by assigned locations
const enabled = ref(false)
watch(enabled, (newValue) => {
  weatherstationStore.fetchLocations(newValue)
})

// Add location.
const newLocationName = ref('')
const addLocation = () => {
  if (newLocationName.value.trim() !== '') {
    const newLocation = {
      name: newLocationName.value.trim()
    }
    weatherstationStore.addLocation(newLocation)

    newLocationName.value = ''
  }
}
// Update Modal.
const updateModalActive = ref(false)
const selectedLocation = ref(null)

const toggleUpdateModal = (location) => {
  selectedLocation.value = location
  updateModalActive.value = !updateModalActive.value
}

const closeUpdateModal = () => {
  updateModalActive.value = false
  selectedLocation.value = null
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
    await weatherstationStore.deleteLocation(id)
    toggleDeleteModal()
  } catch (error) {
    console.error('Error deleting location:', error)
  }
}
</script>
