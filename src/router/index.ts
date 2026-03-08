import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'
import store from '@/stores'
import { useAuthStore } from '@/stores/modules/auth'

import {
  canAccessPath,
  ensureDynamicRoutes,
  getFirstAccessiblePath,
  isKnownBusinessPath,
} from './dynamic-routes'
import authRoutes from './modules/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AppRoot',
      component: AppLayout,
      children: [],
    },
    {
      path: '/403',
      name: 'Forbidden',
      meta: {
        title: '无权限访问',
      },
      component: () => import('@/views/403/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      meta: {
        title: '页面不存在',
      },
      component: () => import('@/views/404/index.vue'),
    },
    ...authRoutes,
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore(store)
  authStore.hydrate()

  const isLoginRoute = to.name === 'Login'
  const isForbiddenRoute = to.name === 'Forbidden'
  const isNotFoundRoute = to.name === 'NotFound'
  const isAuthenticated = authStore.restoreSession()

  if (!isAuthenticated && !isLoginRoute && !isNotFoundRoute) {
    return {
      name: 'Login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (isAuthenticated) {
    const added = ensureDynamicRoutes(router, authStore.menus)
    const firstAccessiblePath = getFirstAccessiblePath(authStore.menus)

    if (isLoginRoute) {
      const redirect =
        typeof to.query.redirect === 'string' ? to.query.redirect : firstAccessiblePath
      return redirect
    }

    if (added && isKnownBusinessPath(to.path) && canAccessPath(to.path, authStore.menus)) {
      return to.fullPath
    }

    if (!isForbiddenRoute && !isNotFoundRoute && isKnownBusinessPath(to.path)) {
      const allowed = canAccessPath(to.path, authStore.menus)

      if (!allowed) {
        return {
          name: 'Forbidden',
        }
      }
    }

    if (isNotFoundRoute && isKnownBusinessPath(to.path)) {
      return {
        name: canAccessPath(to.path, authStore.menus) ? 'NotFound' : 'Forbidden',
      }
    }

    if (added) {
      return to.fullPath
    }

    if (to.name === 'AppRoot') {
      return firstAccessiblePath
    }
  }

  return true
})

export default router
