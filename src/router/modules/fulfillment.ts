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
      {
        path: 'tracking/:id',
        name: 'OrderFulfillmentDetail',
        meta: {
          title: '订单履约详情',
        },
        component: () => import('@/views/order-fulfillment/detail.vue'),
      },
    ],
  },
]

export default fulfillmentRoutes
