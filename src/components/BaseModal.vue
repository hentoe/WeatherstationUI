<template>
  <div
    v-show="modalActive"
    class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
  >
    <div v-if="modalActive" class="p-4 bg-white self-start mt-32 max-w-screen-md">
      <slot></slot>
      <button
        @click="$emit('close-modal')"
        class="trounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close-modal'])
defineProps({
  modalActive: {
    type: Boolean,
    default: false
  }
})
</script>
