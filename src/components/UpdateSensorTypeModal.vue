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
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <Cog6ToothIcon class="h-6 w-6 text-yellow-500" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      id="modal-headline"
                      class="text-base font-semibold leading-6 text-gray-900"
                      >{{ modalHeadline }}</DialogTitle
                    >
                    <div class="mt-2">
                      <form @submit.prevent="$emit('handle-update', localSensorType)">
                        <div class="mb-4">
                          <input
                            v-model="localSensorType.name"
                            type="text"
                            id="sensor_typeName"
                            name="name"
                            class="mt-1 p-2 w-full border rounded-md shadow-xs focus:ring-3 focus:ring-blue-200 focus:outline-hidden focus:border-blue-300"
                          />
                        </div>

                        <div class="mb-4">
                          <input
                            v-model="localSensorType.unit"
                            type="text"
                            id="sensor_typeUnit"
                            name="unit"
                            class="mt-1 p-2 w-full border rounded-md shadow-xs focus:ring-3 focus:ring-blue-200 focus:outline-hidden focus:border-blue-300"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  @click="handleUpdate"
                >
                  Save
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="$emit('close-modal')"
                  ref="cancelButtonRef"
                >
                  Cancel
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
import { ref, watchEffect } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { useWeatherstationStore } from '@/stores/weatherstation.store'

const weatherstationStore = useWeatherstationStore()

const emit = defineEmits(['close-modal', 'handle-update'])

const props = defineProps({
  modalActive: {
    type: Boolean,
    default: false
  },
  sensor_type: {
    type: Object,
    default: () => ({})
  },
  modalHeadline: {
    type: String,
    default: ''
  }
})

const localSensorType = ref({ ...props.sensor_type })

// Update local copy on form change
watchEffect(() => {
  localSensorType.value = { ...props.sensor_type }
})

const handleUpdate = async () => {
  await weatherstationStore.updateSensorType(localSensorType.value)
  emit('close-modal')
}
</script>
