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
  createRoutes: RouteFactory
}

export const routeCatalog: RouteCatalogItem[] = [
  {
    path: '/',
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
    createRoutes: createOrderTrackingRoutes,
  },
]

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function createPathMatcher(pattern: string) {
  if (pattern === '/') {
    return /^\/$/
  }

  const matcherSource = pattern
    .split('/')
    .map((segment, index) => {
      if (index === 0) {
        return ''
      }

      if (segment.startsWith(':')) {
        return '[^/]+'
      }

      return escapeRegExp(segment)
    })
    .join('/')

  return new RegExp(`^${matcherSource}$`)
}

function normalizeRoutePath(path: string) {
  if (!path || path === '/') {
    return '/'
  }

  return path.startsWith('/') ? path : `/${path}`
}

function joinRoutePaths(parentPath: string, childPath: string) {
  if (!childPath) {
    return normalizeRoutePath(parentPath)
  }

  if (childPath.startsWith('/')) {
    return normalizeRoutePath(childPath)
  }

  const normalizedParent = normalizeRoutePath(parentPath)

  if (normalizedParent === '/') {
    return normalizeRoutePath(childPath)
  }

  return normalizeRoutePath(`${normalizedParent}/${childPath}`)
}

function collectRoutePatterns(routes: RouteRecordRaw[], parentPath = '/') {
  const patterns: string[] = []

  for (const route of routes) {
    const routePath = joinRoutePaths(parentPath, `${route.path ?? ''}`)
    patterns.push(routePath)

    if (route.children?.length) {
      patterns.push(...collectRoutePatterns(route.children, routePath))
    }
  }

  return patterns
}

export function getCatalogRoutePatterns(item: RouteCatalogItem) {
  const patterns = [item.path, ...collectRoutePatterns(item.createRoutes())]
  return [...new Set(patterns.map((pattern) => normalizeRoutePath(pattern)))]
}

export function getKnownBusinessPathMatchers() {
  return routeCatalog.flatMap((item) =>
    getCatalogRoutePatterns(item).map((pattern) => createPathMatcher(pattern)),
  )
}

export function getRouteFactoryByPath(path: string) {
  return routeCatalog.find((item) => getCatalogRoutePatterns(item).includes(path))?.createRoutes
}
