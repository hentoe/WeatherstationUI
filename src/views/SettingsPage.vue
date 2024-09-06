<template>
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <h1 class="sr-only">General Settings</h1>

    <aside
      class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"
    >
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          <li v-for="item in secondaryNavigation" :key="item.name">
            <router-link
              :to="item.href"
              :class="[
                isCurrent(item.name)

                  ? 'bg-ice dark:bg-ocean text-denim dark:text-ice'
                  : 'text-midnight dark:text-steel hover:bg-ice dark:hover:bg-ocean hover:text-denim dark:hover:text-ice',
                'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  isCurrent(item.name)
                    ? 'text-denim dark:text-ice'
                    : 'text-gray-400 dark:text-steel group-hover:text-denim dark:group-hover:text-ice',
                  'h-6 w-6 shrink-0'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { FingerPrintIcon, UserCircleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const secondaryNavigation = [
  { name: 'General', href: '/settings/general', icon: UserCircleIcon },
  { name: 'Security', href: '/settings/security', icon: FingerPrintIcon }
]

function isCurrent(section) {
  return route.path.includes(section.toLowerCase())
}
</script>
