<template>
  <div>
    <h2 class="text-base font-semibold leading-7 text-midnight dark:text-ice">API Key</h2>
    <p class="mt-1 text-sm leading-6 text-gray-500 dark:text-steel">
      Get your API-Key to connect your sensors.
    </p>

    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          API-Key
        </dt>
        <dd class="mt-1 flex justify-end gap-x-6 sm:mt-0 sm:flex-auto">
          <button
            type="button"
            class="font-semibold text-denim dark:text-steel hover:text-ocean"
            @click="showModal"
          >
            Get your key
          </button>
        </dd>
      </div>
    </dl>
  </div>
  <ApiKeyModal
    :modalActive="apiModalActive"
    @close-modal="closeModal"
    modalHeadline="Get API-Key"
  />
</template>

<script setup>
import { ref } from 'vue'
import ApiKeyModal from './ApiKeyModal.vue'

const apiModalActive = ref(false)

const showModal = () => {
  apiModalActive.value = true
}
const closeModal = () => {
  apiModalActive.value = false
}
</script>
