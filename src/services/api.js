import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
})

let interceptorsInstalled = false

export const installApiInterceptors = ({ pinia, router }) => {
  if (interceptorsInstalled) return

  interceptorsInstalled = true

  api.interceptors.request.use((config) => {
    const authStore = useAuthStore(pinia)

    if (authStore?.isAuthenticated) {
      config.headers.Authorization = `Token ${authStore.token}`
    }

    return config
  })

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        useAuthStore(pinia).clearToken()

        if (router.currentRoute.value.name !== 'login') {
          await router.replace({ name: 'login' })
        }
      }

      return Promise.reject(error)
    }
  )
}

export default api
