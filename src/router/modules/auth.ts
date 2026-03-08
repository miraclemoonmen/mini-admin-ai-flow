import type { RouteRecordRaw } from 'vue-router'

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '欢迎登录',
    },
    component: () => import('@/views/login/index.vue'),
  },
]

export default authRoutes
