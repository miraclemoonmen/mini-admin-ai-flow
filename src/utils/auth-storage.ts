import type { AuthSession } from '@/types'

const AUTH_STORAGE_KEY = 'mini-admin-ai-flow:auth-session'

function isClient() {
  return typeof window !== 'undefined'
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
    return JSON.parse(raw) as AuthSession
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
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
