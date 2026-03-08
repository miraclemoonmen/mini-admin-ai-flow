import type { RouteRecordRaw } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        meta: {
          title: '外贸家居经营看板',
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
]

export default dashboardRoutes
