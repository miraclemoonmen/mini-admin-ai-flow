<template>
  <el-container class="app-shell h-screen overflow-hidden bg-[#fff8f1] text-slate-900">
    <el-aside
      :width="appStore.sidebarCollapsed ? '82px' : '252px'"
      class="flex h-screen flex-col border-r border-orange-100 bg-[#fff1e6] text-slate-900 transition-all duration-300"
    >
      <div class="px-4 py-4">
        <div class="flex items-center rounded-[28px] bg-white px-4 py-3 shadow-[0_16px_40px_rgba(249,115,22,0.12)]">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-[18px] bg-gradient-to-br from-orange-400 via-rose-400 to-amber-300 text-sm font-black text-white"
          >
            FH
          </div>
          <div v-show="!appStore.sidebarCollapsed" class="ml-3 min-w-0">
            <p class="truncate text-sm font-semibold text-slate-900">Furni Harbor</p>
            <p class="truncate text-xs text-slate-500">外贸家居运营台</p>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-3 pb-4">
        <el-menu
          :default-active="activeMenu"
          :collapse="appStore.sidebarCollapsed"
          :collapse-transition="false"
          background-color="#fff1e6"
          text-color="#7c5a44"
          active-text-color="#ea580c"
          router
        >
          <el-menu-item index="/">
            <div class="menu-icon" aria-hidden="true">看</div>
            <span class="menu-label">经营看板</span>
          </el-menu-item>
          <el-menu-item index="/products" disabled>
            <div class="menu-icon" aria-hidden="true">品</div>
            <span class="menu-label">产品选品</span>
          </el-menu-item>
          <el-menu-item index="/orders" disabled>
            <div class="menu-icon" aria-hidden="true">单</div>
            <span class="menu-label">订单履约</span>
          </el-menu-item>
          <el-sub-menu index="workspace">
            <template #title>
              <div class="menu-icon" aria-hidden="true">灵</div>
              <span class="menu-label">灵感中心</span>
            </template>
            <el-menu-item index="/workspace/reports" disabled>市场洞察</el-menu-item>
            <el-menu-item index="/workspace/audit" disabled>买家反馈</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-aside>

    <el-container class="h-screen overflow-hidden">
      <div class="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <el-header class="mx-4 mt-4 flex h-18 shrink-0 items-center justify-between rounded-[30px] border border-orange-100 bg-white px-6 shadow-[0_14px_34px_rgba(249,115,22,0.08)]">
          <div class="flex items-center gap-4">
            <el-button round class="!border-orange-200 !bg-orange-50 !text-orange-600" @click="appStore.toggleSidebar()">
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

        <el-main class="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-5">
          <RouterView />
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
const route = useRoute()

const activeMenu = computed(() => route.path)
const currentPageTitle = computed(() => {
  if (route.name === 'Dashboard') {
    return '外贸家居经营看板'
  }

  return String(route.name ?? '外贸家居经营看板')
})
</script>

<style scoped>
.app-shell :deep(.el-menu) {
  border-right: 0;
}

.app-shell :deep(.el-menu-item),
.app-shell :deep(.el-sub-menu__title) {
  border-radius: 18px;
  margin-bottom: 8px;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-icon {
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  color: #c2410c;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  box-shadow: inset 0 0 0 1px rgba(251, 146, 60, 0.18);
}

.menu-label {
  min-width: 0;
}

.app-shell :deep(.el-menu-item:hover),
.app-shell :deep(.el-sub-menu__title:hover) {
  background: rgba(255, 255, 255, 0.8);
}

.app-shell :deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, rgba(255, 237, 213, 1) 0%, rgba(255, 255, 255, 1) 100%);
  box-shadow: 0 10px 24px rgba(249, 115, 22, 0.12);
}

.app-shell :deep(.el-menu-item.is-active .menu-icon),
.app-shell :deep(.el-sub-menu.is-active > .el-sub-menu__title .menu-icon) {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  color: white;
  box-shadow: none;
}

.app-shell :deep(.el-menu--collapse) {
  width: 100%;
}

.app-shell :deep(.el-menu--collapse .el-menu-item),
.app-shell :deep(.el-menu--collapse .el-sub-menu__title) {
  justify-content: center;
  padding: 0;
  margin-inline: auto;
  width: 56px;
  gap: 0;
}

.app-shell :deep(.el-menu--collapse .menu-label) {
  display: none;
}

.app-shell :deep(.el-menu--collapse .menu-icon) {
  margin: 0;
}

.app-shell :deep(.el-menu--collapse .el-sub-menu__icon-arrow) {
  display: none;
}

.app-shell :deep(.el-menu--collapse .el-tooltip__trigger),
.app-shell :deep(.el-menu--collapse .el-sub-menu > .el-tooltip),
.app-shell :deep(.el-menu--collapse .el-menu-tooltip__trigger) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.app-shell :deep(.el-menu--collapse .el-sub-menu .el-sub-menu__title) {
  padding-inline: 0;
}
</style>
