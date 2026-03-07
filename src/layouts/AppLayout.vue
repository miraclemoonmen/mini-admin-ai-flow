<template>
  <el-container class="app-shell min-h-screen bg-[#fff8f1] text-slate-900">
    <el-aside
      :width="appStore.sidebarCollapsed ? '82px' : '252px'"
      class="border-r border-orange-100 bg-[#fff1e6] text-slate-900 transition-all duration-300"
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

      <div class="px-3 pb-4">
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
            <span>经营看板</span>
          </el-menu-item>
          <el-menu-item index="/products" disabled>
            <span>产品选品</span>
          </el-menu-item>
          <el-menu-item index="/orders" disabled>
            <span>订单履约</span>
          </el-menu-item>
          <el-sub-menu index="workspace">
            <template #title>灵感中心</template>
            <el-menu-item index="/workspace/reports" disabled>市场洞察</el-menu-item>
            <el-menu-item index="/workspace/audit" disabled>买家反馈</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-aside>

    <el-container>
      <el-header class="mx-4 mt-4 flex h-18 items-center justify-between rounded-[30px] border border-orange-100 bg-white px-6 shadow-[0_14px_34px_rgba(249,115,22,0.08)]">
        <div class="flex items-center gap-4">
          <el-button round class="!border-orange-200 !bg-orange-50 !text-orange-600" @click="appStore.toggleSidebar()">
            {{ appStore.sidebarCollapsed ? '展开导航' : '收起导航' }}
          </el-button>
          <div>
            <p class="text-xs uppercase tracking-[0.24em] text-orange-400">FURNITURE EXPORT STUDIO</p>
            <p class="text-lg font-semibold text-slate-900">外贸家居经营看板</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <el-tag round class="!border-0 !bg-emerald-50 !text-emerald-600">店铺在线</el-tag>
          <el-avatar :size="40" class="!bg-gradient-to-br from-orange-400 to-pink-400">M</el-avatar>
        </div>
      </el-header>

      <div class="mx-4 mt-4 rounded-[26px] border border-orange-100 bg-white px-6 py-4 shadow-[0_10px_30px_rgba(249,115,22,0.06)]">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentPageTitle }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-main class="p-4 md:p-6">
        <RouterView />
      </el-main>
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
    return '经营看板'
  }

  return String(route.name ?? '经营看板')
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
}

.app-shell :deep(.el-menu-item:hover),
.app-shell :deep(.el-sub-menu__title:hover) {
  background: rgba(255, 255, 255, 0.8);
}

.app-shell :deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, rgba(255, 237, 213, 1) 0%, rgba(255, 255, 255, 1) 100%);
  box-shadow: 0 10px 24px rgba(249, 115, 22, 0.12);
}
</style>
