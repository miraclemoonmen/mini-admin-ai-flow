import type { RouteRecordName, Router } from 'vue-router'

import type { AppMenuItem } from '@/types'

import { getRouteFactoryByPath } from './route-catalog'
import { getAccessibleMenuPaths } from './route-access'

function hasNamedRoute(router: Router, name?: RouteRecordName) {
  if (!name) {
    return false
  }

  return router.hasRoute(name)
}
export function ensureDynamicRoutes(router: Router, items: AppMenuItem[] = []) {
  let added = false
  const uniquePaths = getAccessibleMenuPaths(items)

  for (const path of uniquePaths) {
    const createRoutes = getRouteFactoryByPath(path)

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
