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
      path: '/settings',
      component: () => import('../views/SettingsPage.vue'),
      children: [
        {
          path: '',
          redirect: 'settings/general'
        },
        {
          path: 'general',
          name: 'GeneralSettings',
          component: () => import('@/components/SettingsGeneral.vue')
        },
        {
          path: 'security',
          name: 'SecuritySettings',
          component: () => import('@/components/SettingsSecurity.vue')
        }
      ]
    },
    {
      path: '/password/reset',
      name: 'password-reset',
      meta: {
        requireGuest: true
      },
      component: () => import('../views/RecoverPassword.vue')
    },
    {
      path: '/password-reset-notice',
      name: 'password-reset-notice',
      meta: {
        requireGuest: true
      },
      component: () => import('../views/RecoverPasswordNotice.vue')
    },
    {
      path: '/password/reset/confirm',
      name: 'password-reset-confirm',
      meta: {
        requireGuest: true
      },
      component: () => import('../views/RecoverPasswordConfirm.vue')
    },
    {
      path: '/activation-notice',
      name: 'activation-notice',
      meta: {
        requireGuest: true
      },
      component: () => import('../views/EmailActivationNotice.vue')
    },
    {
      path: '/send-activation-email',
      name: 'resend-activation-email',
      meta: {
        requireGuest: true
      },
      component: () => import('../views/EmailActivationAgain.vue')
    },
    {
      path: '/activate',
      name: 'activate-account',
      meta: {
        requireGuest: true
      },
      component: () => import('../views/ActivateAccount.vue')
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
