<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Sensors</h1>
    </div>
  </header>
  <div class="fixed inset-0 flex items-center justify-center">
    <button
      type="button"
      @click="toggleModal"
      class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Open Modal
    </button>
  </div>

  <!-- Delete Modal -->
  <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
    <h1>Hello from Modal.</h1></BaseModal
  >
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '../../components/BaseModal.vue'

// Modal stuff.
const modalActive = ref(false)

const toggleModal = () => {
  modalActive.value = !modalActive.value
}
</script>
