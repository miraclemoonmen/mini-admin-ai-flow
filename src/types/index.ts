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
