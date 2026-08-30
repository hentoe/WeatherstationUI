import { vi } from 'vitest'

const values = new Map()

vi.stubGlobal('localStorage', {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, String(value)),
  removeItem: (key) => values.delete(key),
  clear: () => values.clear()
})
