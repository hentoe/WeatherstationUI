<template>
  <Disclosure as="nav" class="sticky top-0 z-50 bg-ocean dark:bg-midnight">
    <template v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md p-2 text-ice dark:text-steel hover:bg-steel dark:hover:bg-ocean hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <svg
                class="h-8 w-auto fill-ice"
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="700.000000pt"
                height="700.000000pt"
                viewBox="0 0 700.000000 700.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,700.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M3375 6035 c-306 -53 -551 -281 -624 -580 -18 -77 -19 -128 -20
-1229 l-1 -1149 -60 -55 c-212 -191 -358 -480 -387 -767 -31 -303 51 -609 230
-855 65 -89 215 -231 311 -294 123 -81 284 -151 396 -172 14 -3 45 -10 70 -16
25 -6 107 -11 182 -13 219 -4 378 31 573 126 149 72 320 211 415 334 29 39 90
125 90 129 0 2 17 34 38 72 40 74 96 230 113 317 83 430 -59 857 -384 1154
l-46 43 -3 1167 -3 1168 -32 93 c-71 210 -203 362 -399 460 -137 69 -305 93
-459 67z m260 -476 c68 -34 131 -101 156 -168 l22 -56 1 -1253 1 -1253 54 -29
c200 -110 334 -292 387 -525 3 -16 8 -78 9 -136 7 -269 -120 -509 -348 -659
-63 -41 -188 -94 -248 -106 -113 -21 -179 -23 -274 -10 -294 41 -535 244 -629
532 -24 72 -26 88 -33 189 -18 291 139 573 398 715 l54 29 1 1243 c0 684 4
1259 8 1278 16 68 57 128 129 186 70 58 220 69 312 23z"
                  />
                  <path
                    d="M3457 5405 c-48 -16 -61 -28 -81 -69 -14 -31 -16 -166 -16 -1333 l0
-1300 -42 -12 c-24 -7 -71 -28 -105 -47 -259 -144 -374 -461 -266 -734 68
-172 200 -292 388 -356 63 -21 252 -25 308 -5 21 7 44 14 51 15 46 7 158 78
222 142 234 232 238 594 9 830 -72 74 -160 131 -242 155 l-43 12 0 1301 c0
1250 -1 1303 -19 1336 -32 61 -99 87 -164 65z"
                  />
                  <path
                    d="M4567 5541 c-90 -46 -96 -162 -10 -218 24 -16 53 -18 228 -18 218 0
234 4 271 60 21 31 20 99 -1 131 -35 54 -52 58 -262 59 -159 1 -201 -1 -226
-14z"
                  />
                  <path
                    d="M4563 4953 c-21 -10 -41 -33 -54 -59 -17 -36 -18 -49 -10 -81 13 -47
44 -78 91 -90 47 -12 378 -9 410 4 39 17 63 49 70 98 8 52 -9 89 -57 123 -27
19 -43 20 -223 21 -161 0 -201 -3 -227 -16z"
                  />
                  <path
                    d="M4562 4363 c-58 -28 -83 -115 -51 -174 5 -11 25 -29 42 -39 29 -18
52 -20 230 -20 153 0 204 3 226 14 86 45 83 179 -5 221 -48 23 -395 21 -442
-2z"
                  />
                  <path
                    d="M4755 3790 c-153 -4 -185 -8 -209 -23 -76 -50 -64 -170 21 -212 47
-23 391 -22 439 1 82 39 88 174 10 216 -37 20 -79 23 -261 18z"
                  />
                </g>
              </svg>
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <!-- Desktop Menu -->
                <RouterLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="{ name: item.href }"
                  :class="[
                    $route.name === item.href
                      ? 'bg-denim text-white dark:bg-ocean dark:text-ice'
                      : 'text-ice hover:bg-steel hover:text-white dark:text-ice dark:hover:bg-ocean',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  ]"
                  :aria-current="$route.name === item.href ? 'page' : undefined"
                  >{{ item.name }}</RouterLink
                >
              </div>
            </div>
          </div>
          <!-- Menu on right side -->
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <!-- Bell -->
            <button
              type="button"
              class="relative rounded-full bg-ocean dark:bg-midnight p-1 text-ice focus:outline-none focus:ring-2 focus:ring-ice focus:ring-offset-2 focus:ring-offset-ocean hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-1 hover:ring-offset-ocean"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <MenuButton
                class="relative flex rounded-full bg-ocean dark:bg-midnight text-sm focus:outline-none focus:ring-2 focus:ring-ice focus:ring-offset-2 focus:ring-offset-ocean hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-1 hover:ring-offset-ocean"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  v-if="userStore.profilePicture"
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile picture"
                />
                <svg
                  v-if="!userStore.profilePicture"
                  class="h-8 w-8 stroke-ice hover:stroke-ice"
                  data-slot="icon"
                  aria-hidden="true"
                  fill="none"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-ice dark:bg-midnight py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem>
                    <MenuButton :class="['block px-4 py-2 text-sm text-midnight dark:text-ice']">
                      {{ userStore.name }}
                    </MenuButton>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <RouterLink
                      :to="{ name: 'MyAccount' }"
                      :class="[
                        active ? 'bg-steel dark:bg-ocean' : '',
                        'block px-4 py-2 text-sm text-midnight dark:text-ice'
                      ]"
                      >Your Profile</RouterLink
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-steel dark:bg-ocean' : '',
                        'block px-4 py-2 text-sm text-midnight dark:text-ice'
                      ]"
                      >Settings</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-steel dark:bg-ocean' : '',
                        'block px-4 py-2 text-sm text-midnight dark:text-ice'
                      ]"
                      @click="handleSignOut"
                      >Sign out</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="{ name: item.href }"
            :class="[
              $route.name === item.href
                ? 'bg-denim text-white dark:bg-ocean dark:text-ice'
                : 'text-ice hover:bg-steel hover:text-white dark:text-steel dark:hover:bg-ocean',
              'block rounded-md px-3 py-2 text-base font-medium'
            ]"
            :aria-current="$route.name === item.href ? 'page' : undefined"
            >{{ item.name }}</RouterLink
          >
        </div>
      </DisclosurePanel>
    </template>
  </Disclosure>
</template>

<script setup>
import { onMounted } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth.store'
import { useUserStore } from '../stores/user.store'
import { useWeatherstationStore } from '../stores/weatherstation.store'
import { useRouter } from 'vue-router'

const navigation = [
  { name: 'Dashboard', href: 'DashboardView' },
  { name: 'Locations', href: 'LocationView' },
  { name: 'Sensors', href: 'SensorView' },
  { name: 'Sensor Types', href: 'SensorTypeView' }
]

const router = useRouter()

const userStore = useUserStore()
const weatherstationStore = useWeatherstationStore()

onMounted(async () => {
  await userStore.fetchUserData()
  await weatherstationStore.fetchSensors()
  await weatherstationStore.fetchSensorTypes()
  await weatherstationStore.fetchLocations(true)
})

const handleSignOut = async () => {
  const authStore = useAuthStore()
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>
