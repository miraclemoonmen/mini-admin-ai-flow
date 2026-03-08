import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { AppMenuItem, AuthSession, AuthUserInfo } from '@/types'
import { buildAuthSession, loginByMock } from '@/api/modules/auth'
import { clearAuthSession, isSessionExpired, readAuthSession, writeAuthSession } from '@/utils/auth-storage'

type AuthStatus = 'anonymous' | 'authenticated' | 'expired'

interface LoginPayload {
  account: string
  password: string
  rememberMe: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const userInfo = ref<AuthUserInfo | null>(null)
  const menus = ref<AppMenuItem[]>([])
  const expiresAt = ref('')
  const rememberMe = ref(true)
  const authStatus = ref<AuthStatus>('anonymous')
  const isHydrated = ref(false)

  const isAuthenticated = computed(
    () =>
      authStatus.value === 'authenticated' &&
      token.value.length > 0 &&
      expiresAt.value.length > 0 &&
      !isSessionExpired(expiresAt.value),
  )

  function applySession(session: AuthSession) {
    token.value = session.token
    userInfo.value = session.userInfo
    menus.value = session.menus
    expiresAt.value = session.expiresAt
    rememberMe.value = session.rememberMe
    authStatus.value = isSessionExpired(session.expiresAt) ? 'expired' : 'authenticated'

    if (authStatus.value === 'expired') {
      clearSession()
    }
  }

  function clearSession() {
    token.value = ''
    userInfo.value = null
    menus.value = []
    expiresAt.value = ''
    authStatus.value = 'anonymous'
    clearAuthSession()
  }

  function hydrate() {
    if (isHydrated.value) {
      return
    }

    const session = readAuthSession()

    if (session) {
      applySession(session)
    }

    isHydrated.value = true
  }

  function restoreSession() {
    hydrate()

    if (!isAuthenticated.value) {
      clearSession()
    }

    return isAuthenticated.value
  }

  async function login(payload: LoginPayload) {
    const result = await loginByMock({
      account: payload.account,
      password: payload.password,
    })

    if (result.code !== 0 || !result.data) {
      return result
    }

    const session = buildAuthSession(result.data, payload.rememberMe)
    applySession(session)
    writeAuthSession(session)

    return result
  }

  function logout() {
    clearSession()
  }

  return {
    token,
    userInfo,
    menus,
    expiresAt,
    rememberMe,
    authStatus,
    isAuthenticated,
    isHydrated,
    hydrate,
    restoreSession,
    login,
    logout,
  }
})
