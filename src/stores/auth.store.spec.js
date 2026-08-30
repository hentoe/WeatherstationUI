import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from './auth.store'

describe('auth store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('treats a future token as authenticated', () => {
    const store = useAuthStore()
    const expiry = new Date(Date.now() + 60_000).toISOString()

    store.setToken('token', expiry)

    expect(store.isAuthenticated).toBe(true)
    expect(localStorage.getItem('token')).toBe('token')
  })

  it('clears an expired token instead of authenticating the session', () => {
    const store = useAuthStore()

    store.setToken('token', new Date(Date.now() - 60_000).toISOString())

    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('removes an expired persisted token during initialization', () => {
    localStorage.setItem('token', 'token')
    localStorage.setItem('expiry', new Date(Date.now() - 60_000).toISOString())
    const store = useAuthStore()

    store.initialize()

    expect(store.token).toBe('')
    expect(localStorage.getItem('token')).toBeNull()
  })
})
