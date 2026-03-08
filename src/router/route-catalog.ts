import type { RouteRecordRaw } from 'vue-router'

type RouteFactory = () => RouteRecordRaw[]

const createOrderTrackingRoutes: RouteFactory = () => [
  {
    path: 'orders/tracking',
    name: 'OrderFulfillmentTracking',
    meta: {
      title: '订单履约追踪',
    },
    component: () => import('@/views/order-fulfillment/index.vue'),
  },
  {
    path: 'orders/tracking/:id',
    name: 'OrderFulfillmentDetail',
    meta: {
      title: '订单履约详情',
      hidden: true,
    },
    component: () => import('@/views/order-fulfillment/detail.vue'),
  },
]

export interface RouteCatalogItem {
  path: string
  knownPathMatchers: RegExp[]
  createRoutes: RouteFactory
}

export const routeCatalog: RouteCatalogItem[] = [
  {
    path: '/',
    knownPathMatchers: [/^\/$/],
    createRoutes: () => [
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
  {
    path: '/orders/tracking',
    knownPathMatchers: [/^\/orders\/tracking$/, /^\/orders\/tracking\/[^/]+$/],
    createRoutes: createOrderTrackingRoutes,
  },
]

export const dynamicRouteMap: Record<string, RouteFactory> = {
  ...Object.fromEntries(routeCatalog.map((item) => [item.path, item.createRoutes])),
  '/orders/tracking/:id': createOrderTrackingRoutes,
}
