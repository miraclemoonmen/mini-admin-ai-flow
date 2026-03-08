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
      <el-tag round class="!border-0 !bg-emerald-50 !text-emerald-600">店铺在线</el-tag>
      <el-avatar :size="40" class="!bg-gradient-to-br from-orange-400 to-pink-400">M</el-avatar>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
const route = useRoute()

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
</script>

<style scoped>
.header-toggle {
  --el-button-bg-color: var(--el-color-primary-light-9);
  --el-button-text-color: var(--el-color-primary);
  --el-button-hover-text-color: var(--el-color-primary);
  --el-button-hover-bg-color: var(--el-color-primary-light-8);
  --el-button-active-bg-color: var(--el-color-primary-light-7);
}
</style>
