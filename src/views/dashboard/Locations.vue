<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Locations</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-xl px-4 py-6 sm:px-6 lg:px-8">
      <ul role="list" class="divide-y divide-gray-100">
        <li class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
              <div class="text-sm font-semibold leading-6 text-gray-900">
                <div
                  class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <PlusIcon class="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <Switch
              v-model="enabled"
              :class="enabled ? 'bg-blue-600' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full"
            >
              <span class="sr-only">Assigned only</span>
              <span
                :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              />
            </Switch>
          </div>
        </li>
        <li
          v-for="location in locations"
          :key="location.name"
          class="flex justify-between gap-x-6 py-5"
        >
          <div class="flex min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">{{ location.name }}</p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <button class="cursor-pointer" @click="openModal">
              <WrenchIcon class="h-6 w-6" />
            </button>

            <button class="cursor-pointer" @click="toggleModal(location.id)">
              <TrashIcon class="h-6 w-6" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </main>
  <DeleteModal
    :modalActive="modalActive"
    @close-modal="toggleModal"
    @handle-delete="handleDelete"
    modalHeadline="Delete location?"
    deleteMessage="Are you sure you want to delete this location? This action cannot be undone!"
  />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

import { PlusIcon, TrashIcon, WrenchIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'

import DeleteModal from '../../components/Deletemodal.vue'

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
