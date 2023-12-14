import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'DashboardView',
      component: () => import('../views/dashboard/DashboardView.vue'),
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
      name: 'LocationView',
      component: () => import('../views/dashboard/LocationView.vue'),
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/dashboard/sensors',
      name: 'SensorView',
      component: () => import('../views/dashboard/SensorView.vue'),
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/dashboard/sensor_types',
      name: 'SensorTypeView',
      component: () => import('../views/dashboard/SensorTypeView.vue'),
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
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        requireGuest: true
      },
      component: RegisterView
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue')
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
