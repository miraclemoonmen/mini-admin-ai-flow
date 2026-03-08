import authLoginMock from '@/mock/auth-login.json'
import type { AppMenuItem, AuthSession, AuthUserInfo, MockResponse } from '@/types'

type AccountStatus = 'active' | 'disabled' | 'password_expired'

interface AuthAccountRecord {
  account: string
  password: string
  status: AccountStatus
  token: string
  expiresInMinutes: number
  userInfo: AuthUserInfo
  menus: AppMenuItem[]
}

interface AuthMockPayload {
  demoCredentials: {
    account: string
    password: string
  }
  accounts: AuthAccountRecord[]
}

export interface LoginCredentials {
  account: string
  password: string
}

export interface DemoAccountOption {
  account: string
  password: string
  label: string
}

export interface LoginSuccessData {
  token: string
  expiresAt: string
  userInfo: AuthUserInfo
  menus: AppMenuItem[]
}

export interface LoginResult {
  code: number
  msg: string
  data: LoginSuccessData | null
}

const authPayload = authLoginMock as MockResponse<AuthMockPayload>

function createExpiresAt(expiresInMinutes: number) {
  return new Date(Date.now() + expiresInMinutes * 60 * 1000).toISOString()
}

export function getDemoCredentials() {
  return authPayload.data.demoCredentials
}

export function getSwitchableDemoAccounts() {
  return authPayload.data.accounts
    .filter((item) => ['mia.chen', 'dashboard.only'].includes(item.account))
    .map<DemoAccountOption>((item) => ({
      account: item.account,
      password: item.password,
      label: item.userInfo.name,
    }))
}

export async function loginByMock(credentials: LoginCredentials): Promise<LoginResult> {
  const account = credentials.account.trim().toLowerCase()
  const password = credentials.password

  await new Promise((resolve) => window.setTimeout(resolve, 450))

  const accountRecord = authPayload.data.accounts.find((item) => item.account.toLowerCase() === account)

  if (!accountRecord) {
    return {
      code: 10001,
      msg: '账号不存在，请确认后重试',
      data: null,
    }
  }

  if (accountRecord.status === 'disabled') {
    return {
      code: 10003,
      msg: '当前账号已被停用，请联系管理员',
      data: null,
    }
  }

  if (accountRecord.status === 'password_expired') {
    return {
      code: 10004,
      msg: '当前账号密码已过期，请联系管理员重置',
      data: null,
    }
  }

  if (accountRecord.password !== password) {
    return {
      code: 10002,
      msg: '密码错误，请重新输入',
      data: null,
    }
  }

  return {
    code: 0,
    msg: '操作成功',
    data: {
      token: accountRecord.token,
      expiresAt: createExpiresAt(accountRecord.expiresInMinutes),
      userInfo: accountRecord.userInfo,
      menus: accountRecord.menus,
    },
  }
}

export function buildAuthSession(data: LoginSuccessData, rememberMe: boolean): AuthSession {
  return {
    token: data.token,
    expiresAt: data.expiresAt,
    rememberMe,
    userInfo: data.userInfo,
    menus: data.menus,
  }
}
