import type { AppMenuItem } from '@/types'

import { routeCatalog } from './route-catalog'

function flattenMenuItems(items: AppMenuItem[] = []) {
  const result: AppMenuItem[] = []

  for (const item of items) {
    result.push(item)

    if (item.children?.length) {
      result.push(...flattenMenuItems(item.children))
    }
  }

  return result
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function createPathMatcher(pattern: string) {
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

function matchesPathPattern(path: string, pattern: string) {
  return createPathMatcher(pattern).test(path)
}

function cloneMenuItem(item: AppMenuItem, children: AppMenuItem[] = []) {
  if (children.length === 0) {
    const { children: _children, ...rest } = item
    return rest
  }

  return {
    ...item,
    children,
  }
}

export function getAccessibleMenuPaths(items: AppMenuItem[] = []) {
  return [
    ...new Set(
      flattenMenuItems(items)
        .filter((item) => item.path && !item.disabled)
        .map((item) => item.path as string),
    ),
  ]
}

export function getFirstAccessiblePath(items: AppMenuItem[] = []) {
  const [firstPath] = getAccessibleMenuPaths(items)

  return firstPath ?? '/'
}

export function isKnownBusinessPath(path: string) {
  return routeCatalog.some((item) =>
    item.knownPathMatchers.some((matcher) => matcher.test(path)),
  )
}

export function canAccessPath(path: string, items: AppMenuItem[] = []) {
  return flattenMenuItems(items).some(
    (item) => item.path && !item.disabled && matchesPathPattern(path, item.path),
  )
}

export function getVisibleMenuItems(items: AppMenuItem[] = []) {
  return items.reduce<AppMenuItem[]>((result, item) => {
    const visibleChildren = item.children?.length ? getVisibleMenuItems(item.children) : []
    const isVisible = item.visibleInMenu !== false
    const hasVisibleChildren = visibleChildren.length > 0

    if (!isVisible && !hasVisibleChildren) {
      return result
    }

    result.push(cloneMenuItem(item, visibleChildren))
    return result
  }, [])
}

export function resolveActiveMenuPath(path: string, items: AppMenuItem[] = []) {
  const matchedItem = flattenMenuItems(items).find(
    (item) => item.path && !item.disabled && matchesPathPattern(path, item.path),
  )

  if (matchedItem?.activeMenuPath) {
    return matchedItem.activeMenuPath
  }

  if (matchedItem?.visibleInMenu !== false && matchedItem?.path) {
    return matchedItem.path
  }

  return path
}
