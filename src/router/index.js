import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/dashboard/Dashboard.vue'),
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/dashboard/my-account',
      name: 'MyAccount',
      component: () => import('../views/dashboard/MyAccount.vue'),
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/dashboard/locations',
      name: 'Locations',
      component: () => import('../views/dashboard/Locations.vue'),
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/dashboard/sensors',
      name: 'Sensors',
      component: () => import('../views/dashboard/Sensors.vue'),
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/dashboard/sensors/add',
      name: 'AddSensor',
      component: () => import('../views/dashboard/AddSensor.vue'),
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requireGuest: true
      },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        requireGuest: true
      },
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = useAuthStore().isAuthenticated
  const requireGuest = to.matched.some((record) => record.meta.requireGuest)
  const requiresAuth = to.matched.some((record) => record.meta.requireLogin)

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (isAuthenticated && requireGuest) {
    next('/')
  } else {
    next()
  }
})

export default router
