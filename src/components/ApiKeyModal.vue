<template>
  <TransitionRoot as="template" :show="modalActive">
    <Dialog as="div" class="relative z-10" @close="$emit('close-modal')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-ice dark:bg-midnight px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <Cog6ToothIcon class="h-6 w-6 text-yellow-500" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      id="modal-headline"
                      class="text-base font-semibold leading-6 text-midnight dark:text-ice"
                      >{{ modalHeadline }}</DialogTitle
                    >
                    <div class="mt-2">
                      <form @submit.prevent="$emit('handle-key')" v-if="!api_key">
                        <div class="mb-4">
                          <input
                            v-model="password"
                            type="password"
                            id="password"
                            placeholder="Enter your Password"
                            name="password"
                            class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none focus:border-blue-300"
                          />
                        </div>
                      </form>
                      <input
                        v-if="api_key"
                        disabled
                        v-model="api_key"
                        id="api_key"
                        class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none focus:border-blue-300"
                      />
                      <p
                        v-if="error.password"
                        v-for="message in error.password"
                        class="mt-2 text-sm text-red-600"
                      >
                        {{ message }}
                      </p>
                      <p
                        v-if="error.non_field_errors"
                        v-for="message in error.non_field_errors"
                        class="mt-2 text-sm text-red-600"
                      >
                        {{ message }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-ice px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  v-if="!api_key"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  @click="handleKey"
                >
                  Show API-Key
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="closeModal"
                  ref="cancelButtonRef"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth.store'
import { useUserStore } from '../stores/user.store'

const authStore = useAuthStore()
const userStore = useUserStore()

const emit = defineEmits(['close-modal', 'handle-key'])

const props = defineProps({
  modalActive: {
    type: Boolean,
    default: false
  },
  modalHeadline: {
    type: String,
    default: ''
  }
})

const password = ref('')
const api_key = ref('')
const error = ref({})

const handleKey = async () => {
  error.value = {}
  try {
    const response = await authStore.getApiKey(userStore.email, password.value)
    api_key.value = response.data.token
    console.log(api_key.value)
  } catch (err) {
    if (err.response && err.response.data) {
      const errorData = err.response.data
      if (errorData.non_field_errors) {
        error.value.non_field_errors = errorData.non_field_errors
      }
      if (errorData.password) {
        error.value.password = errorData.password
      }
    } else {
      console.error('Error', err)
      error.value.non_field_errors = ['An unexpected error occurred.']
    }
  }
}
const closeModal = () => {
  password.value = ''
  api_key.value = ''
  error.value = {}
  emit('close-modal')
}
</script>
