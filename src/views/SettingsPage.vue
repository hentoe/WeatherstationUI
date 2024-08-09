<template>
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <h1 class="sr-only">General Settings</h1>

    <aside
      class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"
    >
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          <li v-for="item in secondaryNavigation" :key="item.name">
            <a
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-ice dark:bg-ocean text-denim dark:text-ice'
                  : 'text-midnight dark:text-steel hover:bg-ice dark:hover:bg-ocean hover:text-denim dark:hover:text-ice',
                'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-denim dark:text-ice'
                    : 'text-gray-400 dark:text-steel group-hover:text-denim dark:group-hover:text-ice',
                  'h-6 w-6 shrink-0'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 class="text-base font-semibold leading-7 text-midnight dark:text-ice">Profile</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500 dark:text-steel">
            This information won't be displayed publicly so no need to be careful what you share.
          </p>

          <dl
            class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
          >
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
                Full name
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-midnight dark:text-ice">{{ userData.name }}</div>
                <button
                  type="button"
                  class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
                >
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
                Email address
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-midnight dark:text-ice">{{ userData.email }}</div>
                <button
                  type="button"
                  class="font-semibold text-denim dark:text-steel hover:text-ocean dark:hover:text-ice"
                >
                  Update
                </button>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 class="text-base font-semibold leading-7 text-midnight dark:text-ice">
            Language and dates
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-500 dark:text-steel">
            Choose what language and date format to use throughout your account.
          </p>

          <dl
            class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
          >
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-midnight dark:text-ice sm:w-64 sm:flex-none sm:pr-6">
                Language
              </dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-midnight dark:text-ice">English</div>
                <button
                  type="button"
                  class="font-semibold text-denim dark:text-steel hover:text-ocea"
                >
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
                <button
                  type="button"
                  class="font-semibold text-denim dark:text-steel hover:text-ocea"
                >
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
                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                    ]"
                  />
                </Switch>
              </dd>
            </SwitchGroup>
          </dl>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'

import { useUserStore } from '../stores/user.store'

const userData = useUserStore()

const secondaryNavigation = [
  { name: 'General', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Security', href: '#', icon: FingerPrintIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Plan', href: '#', icon: CubeIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Team members', href: '#', icon: UsersIcon, current: false }
]

const automaticTimezoneEnabled = ref(true)
</script>
