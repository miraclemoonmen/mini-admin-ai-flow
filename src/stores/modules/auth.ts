import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { AuthSession, AuthUserInfo } from '@/types'
import { buildSession, mockLogin } from '@/utils/auth-mock'
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
    const result = await mockLogin({
      account: payload.account,
      password: payload.password,
    })

    if (result.code !== 0 || !result.data) {
      return result
    }

    const session = buildSession(result.data, payload.rememberMe)
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
