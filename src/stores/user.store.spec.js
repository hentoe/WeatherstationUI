import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

const { post } = vi.hoisted(() => ({ post: vi.fn() }))

vi.mock('@/services/api', () => ({
  default: { post }
}))

import { useUserStore } from './user.store'

describe('user store', () => {
  beforeEach(() => {
    post.mockReset()
    setActivePinia(createPinia())
  })

  it('updates the stored email after a successful email update', async () => {
    const store = useUserStore()
    store.email = 'old@example.com'
    post.mockResolvedValue({ status: 204 })

    await store.updateEmail('new@example.com', 'password')

    expect(store.email).toBe('new@example.com')
  })
})
