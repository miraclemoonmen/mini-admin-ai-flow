import type { AuthSession } from '@/types'

const AUTH_STORAGE_KEY = 'mini-admin-ai-flow:auth-session'

function isClient() {
  return typeof window !== 'undefined'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function normalizeAuthSession(value: unknown): AuthSession | null {
  if (!isRecord(value)) {
    return null
  }

  const token = typeof value.token === 'string' ? value.token : ''
  const expiresAt = typeof value.expiresAt === 'string' ? value.expiresAt : ''
  const rememberMe = typeof value.rememberMe === 'boolean' ? value.rememberMe : true
  const userInfo = isRecord(value.userInfo) ? value.userInfo : null
  const menus = Array.isArray(value.menus) ? value.menus : []

  if (!token || !expiresAt || !userInfo) {
    return null
  }

  return {
    token,
    expiresAt,
    rememberMe,
    userInfo: {
      id: typeof userInfo.id === 'number' ? userInfo.id : 0,
      name: typeof userInfo.name === 'string' ? userInfo.name : '',
      account: typeof userInfo.account === 'string' ? userInfo.account : '',
      role: typeof userInfo.role === 'string' ? userInfo.role : '',
      email: typeof userInfo.email === 'string' ? userInfo.email : '',
    },
    menus,
  }
}

export function readAuthSession() {
  if (!isClient()) {
    return null
  }

  const raw =
    window.localStorage.getItem(AUTH_STORAGE_KEY) ??
    window.sessionStorage.getItem(AUTH_STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = normalizeAuthSession(JSON.parse(raw))

    if (!parsed) {
      clearAuthSession()
      return null
    }

    return parsed
  } catch {
    clearAuthSession()
    return null
  }
}

export function writeAuthSession(session: AuthSession) {
  if (!isClient()) {
    return
  }

  const serializedSession = JSON.stringify(session)

  clearAuthSession()

  if (session.rememberMe) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, serializedSession)
    return
  }

  window.sessionStorage.setItem(AUTH_STORAGE_KEY, serializedSession)
}

export function clearAuthSession() {
  if (!isClient()) {
    return
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
}

export function isSessionExpired(expiresAt: string) {
  const expiresAtTime = new Date(expiresAt).getTime()

  if (!Number.isFinite(expiresAtTime)) {
    return true
  }

  return expiresAtTime <= Date.now()
}
