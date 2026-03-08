import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from './modules/auth'
import dashboardRoutes from './modules/dashboard'
import fulfillmentRoutes from './modules/fulfillment'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...dashboardRoutes, ...fulfillmentRoutes, ...authRoutes],
})

export default router
