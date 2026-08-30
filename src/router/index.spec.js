import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'
import router from './index'

const protectedRoutes = [
  ['/dashboard', '/dashboard'],
  ['/dashboard/locations', '/dashboard/locations'],
  ['/dashboard/sensors', '/dashboard/sensors'],
  ['/dashboard/sensor_types', '/dashboard/sensor_types'],
  ['/dashboard/sensors/add', '/dashboard/sensors/add'],
  ['/settings', '/settings/general'],
  ['/settings/general', '/settings/general'],
  ['/settings/security', '/settings/security']
]

describe('router access control', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it.each(protectedRoutes)('redirects guests away from %s', async (path) => {
    await router.push(path)
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('login')
  })

  it.each(protectedRoutes)(
    'allows authenticated users to access %s',
    async (path, expectedPath) => {
    const authStore = useAuthStore()
    authStore.setToken('token', new Date(Date.now() + 60_000).toISOString())

    await router.push(path)
    await router.isReady()

      expect(router.currentRoute.value.fullPath).toBe(expectedPath)
    }
  )
})
