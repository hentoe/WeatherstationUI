<template>
  <div>
    <h2 class="text-base font-semibold leading-7 text-midnight dark:text-ice">
      Language and dates
    </h2>
    <p class="mt-1 text-sm leading-6 text-gray-500 dark:text-steel">
      This does nothing. Choose what language and date format to use throughout your account.
    </p>

    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          Language
        </dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-midnight dark:text-ice">English</div>
          <button type="button" class="font-semibold text-denim dark:text-steel hover:text-ocean">
            Update
          </button>
        </dd>
      </div>
      <div class="pt-6 sm:flex">
        <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
          Date format
        </dt>
        <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div class="text-midnight dark:text-ice">DD-MM-YYYY</div>
          <button type="button" class="font-semibold text-denim dark:text-steel hover:text-ocean">
            Update
          </button>
        </dd>
      </div>
      <SwitchGroup as="div" class="flex pt-6">
        <SwitchLabel
          as="dt"
          class="flex-none pr-6 font-medium text-midnight dark:text-ice sm:w-64"
          passive
          >Automatic timezone</SwitchLabel
        >
        <dd class="flex flex-auto items-center justify-end">
          <Switch
            v-model="automaticTimezoneEnabled"
            :class="[
              automaticTimezoneEnabled ? 'bg-denim' : 'bg-gray-200',
              'flex w-8 cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denim'
            ]"
          >
            <span
              aria-hidden="true"
              :class="[
                automaticTimezoneEnabled ? 'translate-x-3.5' : 'translate-x-0',
                'h-4 w-4 transform rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
              ]"
            />
          </Switch>
        </dd>
      </SwitchGroup>
    </dl>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
const automaticTimezoneEnabled = ref(true)
</script>
