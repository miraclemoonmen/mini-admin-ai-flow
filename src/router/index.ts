import { createRouter, createWebHistory } from 'vue-router'

import store from '@/stores'
import { useAuthStore } from '@/stores/modules/auth'

import authRoutes from './modules/auth'
import dashboardRoutes from './modules/dashboard'
import fulfillmentRoutes from './modules/fulfillment'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...dashboardRoutes, ...fulfillmentRoutes, ...authRoutes],
})

router.beforeEach((to) => {
  const authStore = useAuthStore(store)
  authStore.hydrate()

  const isLoginRoute = to.name === 'Login'
  const isAuthenticated = authStore.restoreSession()

  if (!isAuthenticated && !isLoginRoute) {
    return {
      name: 'Login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (isAuthenticated && isLoginRoute) {
    const redirect = typeof to.query.redirect === 'string' ? to.query.redirect : '/'
    return redirect
  }

  return true
})

export default router
