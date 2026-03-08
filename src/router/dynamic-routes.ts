import type { RouteRecordName, RouteRecordRaw, Router } from 'vue-router'

import type { AppMenuItem } from '@/types'

type RouteFactory = () => RouteRecordRaw[]
type PathMatcher = RegExp

const dynamicRouteMap: Record<string, RouteFactory> = {
  '/': () => [
    {
      path: '',
      name: 'Dashboard',
      meta: {
        title: '外贸家居经营看板',
      },
      component: () => import('@/views/dashboard/index.vue'),
    },
  ],
  '/orders/tracking': () => [
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
  ],
}

const knownBusinessPathMatchers: PathMatcher[] = [
  /^\/$/,
  /^\/orders\/tracking$/,
  /^\/orders\/tracking\/[^/]+$/,
]

function flattenMenuPaths(items: AppMenuItem[]) {
  const paths: string[] = []

  for (const item of items) {
    if (item.path && !item.disabled) {
      paths.push(item.path)
    }

    if (item.children?.length) {
      paths.push(...flattenMenuPaths(item.children))
    }
  }

  return paths
}

function matchesMenuPath(path: string, menuPath: string) {
  if (menuPath === '/') {
    return path === '/'
  }

  if (path === menuPath) {
    return true
  }

  if (menuPath === '/orders/tracking') {
    return /^\/orders\/tracking\/[^/]+$/.test(path)
  }

  return false
}

function hasNamedRoute(router: Router, name?: RouteRecordName) {
  if (!name) {
    return false
  }

  return router.hasRoute(name)
}

export function getFirstAccessiblePath(items: AppMenuItem[]) {
  const [firstPath] = flattenMenuPaths(items)

  return firstPath ?? '/'
}

export function isKnownBusinessPath(path: string) {
  return knownBusinessPathMatchers.some((matcher) => matcher.test(path))
}

export function canAccessPath(path: string, items: AppMenuItem[]) {
  const paths = flattenMenuPaths(items)

  return paths.some((menuPath) => matchesMenuPath(path, menuPath))
}

export function ensureDynamicRoutes(router: Router, items: AppMenuItem[]) {
  let added = false
  const uniquePaths = [...new Set(flattenMenuPaths(items))]

  for (const path of uniquePaths) {
    const createRoutes = dynamicRouteMap[path]

    if (!createRoutes) {
      continue
    }

    for (const route of createRoutes()) {
      if (hasNamedRoute(router, route.name)) {
        continue
      }

      router.addRoute('AppRoot', route)
      added = true
    }
  }

  return added
}
