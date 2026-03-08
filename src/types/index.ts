export interface MockResponse<T> {
  code: number
  msg: string
  data: T
}

export interface AppMenuItem {
  key: string
  title: string
  icon: string
  path?: string
  disabled?: boolean
  children?: AppMenuItem[]
}

export interface AuthUserInfo {
  id: number
  name: string
  account: string
  role: string
  email: string
}

export interface AuthSession {
  token: string
  expiresAt: string
  rememberMe: boolean
  userInfo: AuthUserInfo
}
