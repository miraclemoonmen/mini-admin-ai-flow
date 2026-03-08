<template>
  <el-header
    class="mx-4 mt-4 flex h-18 shrink-0 items-center justify-between rounded-[30px] border border-orange-100 bg-white px-6 shadow-[0_14px_34px_rgba(249,115,22,0.08)]"
  >
    <div class="flex items-center gap-4">
      <el-button round class="header-toggle" @click="appStore.toggleSidebar()">
        {{ appStore.sidebarCollapsed ? '展开导航' : '收起导航' }}
      </el-button>
      <div>
        <p class="text-xs uppercase tracking-[0.24em] text-orange-400">FURNITURE EXPORT STUDIO</p>
        <p class="text-lg font-semibold text-slate-900">{{ currentPageTitle }}</p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="user-card">
        <div class="status-badge">
          <span class="status-dot"></span>
          <span>在线</span>
        </div>

        <div class="user-copy">
          <p class="text-sm font-semibold text-slate-900">{{ currentUserName }}</p>
          <p class="text-xs text-slate-500">{{ currentUserMeta }}</p>
        </div>

        <el-avatar :size="42" class="user-avatar">
          {{ currentUserInitial }}
        </el-avatar>

        <el-button round class="logout-button" @click="handleLogout">退出</el-button>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAppStore } from '@/stores/modules/app'
import { useAuthStore } from '@/stores/modules/auth'

const appStore = useAppStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const currentPageTitle = computed(() => {
  const routeTitle = route.meta.title

  if (typeof routeTitle === 'string' && routeTitle.length > 0) {
    return routeTitle
  }

  if (typeof route.name === 'string' && route.name.length > 0) {
    return route.name
  }

  return '外贸家居经营看板'
})

const currentUserName = computed(() => authStore.userInfo?.name ?? '游客')
const currentUserMeta = computed(() => {
  const role = authStore.userInfo?.role ?? '未登录'
  const account = authStore.userInfo?.account ?? 'guest'

  return `${role} · ${account}`
})
const currentUserInitial = computed(() => currentUserName.value.slice(0, 1).toUpperCase())

async function handleLogout() {
  authStore.logout()
  await router.push({
    name: 'Login',
  })
}
</script>

<style scoped>
.header-toggle {
  --el-button-bg-color: var(--el-color-primary-light-9);
  --el-button-text-color: var(--el-color-primary);
  --el-button-hover-text-color: var(--el-color-primary);
  --el-button-hover-bg-color: var(--el-color-primary-light-8);
  --el-button-active-bg-color: var(--el-color-primary-light-7);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 14px;
  border-radius: 9999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 247, 237, 0.92));
  padding: 8px 10px 8px 14px;
  box-shadow: 0 14px 30px rgba(249, 115, 22, 0.08);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 9999px;
  background: rgba(236, 253, 245, 1);
  padding: 6px 10px;
  color: rgb(5 150 105);
  font-size: 12px;
  font-weight: 600;
}

.status-dot {
  height: 8px;
  width: 8px;
  border-radius: 9999px;
  background: rgb(16 185 129);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
}

.user-copy {
  min-width: 0;
  text-align: right;
}

.user-avatar {
  --el-avatar-bg-color: transparent;
  background: linear-gradient(135deg, #fb923c, #f97316 55%, #ec4899);
  color: white;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(249, 115, 22, 0.22);
}

.logout-button {
  --el-button-bg-color: rgba(255, 247, 237, 1);
  --el-button-border-color: rgba(251, 191, 36, 0.18);
  --el-button-text-color: rgb(194 65 12);
  --el-button-hover-bg-color: rgba(255, 237, 213, 1);
  --el-button-hover-border-color: rgba(251, 146, 60, 0.22);
  --el-button-hover-text-color: rgb(154 52 18);
  height: 34px;
  padding-inline: 14px;
  font-size: 13px;
  font-weight: 600;
}
</style>
