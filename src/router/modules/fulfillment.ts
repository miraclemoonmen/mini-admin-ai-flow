import type { RouteRecordRaw } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'

const fulfillmentRoutes: RouteRecordRaw[] = [
  {
    path: '/orders',
    component: AppLayout,
    children: [
      {
        path: 'tracking',
        name: 'OrderFulfillmentTracking',
        meta: {
          title: '订单履约追踪',
        },
        component: () => import('@/views/order-fulfillment/index.vue'),
      },
    ],
  },
]

export default fulfillmentRoutes
