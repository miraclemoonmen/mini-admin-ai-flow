<template>
  <el-aside
    width="252px"
    class="flex h-screen flex-col border-r border-orange-100 bg-[#fff1e6] text-slate-900 transition-all duration-300"
  >
    <div class="px-4 py-4">
      <div class="flex items-center rounded-[28px] bg-white px-4 py-3 shadow-[0_16px_40px_rgba(249,115,22,0.12)]">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-[18px] bg-gradient-to-br from-orange-400 via-rose-400 to-amber-300 text-sm font-black text-white"
        >
          FH
        </div>
        <div class="ml-3 min-w-0">
          <p class="truncate text-sm font-semibold text-slate-900">Furni Harbor</p>
          <p class="truncate text-xs text-slate-500">外贸家居运营台</p>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-3 pb-4">
      <el-menu
        :default-active="activeMenu"
        router
      >
        <template v-for="item in visibleMenuItems" :key="item.key">
          <el-sub-menu v-if="item.children?.length" :index="item.key">
            <template #title>
              <div class="menu-icon" aria-hidden="true">{{ item.icon }}</div>
              <span class="menu-label">{{ item.title }}</span>
            </template>

            <el-menu-item
              v-for="child in item.children"
              :key="child.key"
              :index="child.path || child.key"
              :disabled="child.disabled"
            >
              {{ child.title }}
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item
            v-else
            :index="item.path || item.key"
            :disabled="item.disabled"
          >
            <div class="menu-icon" aria-hidden="true">{{ item.icon }}</div>
            <span class="menu-label">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { getVisibleMenuItems, resolveActiveMenuPath } from '@/router/route-access'
import { useAuthStore } from '@/stores/modules/auth'
import type { AppMenuItem } from '@/types'

const authStore = useAuthStore()
const route = useRoute()

const menuItems = computed<AppMenuItem[]>(() => authStore.menus)

const visibleMenuItems = computed(() => getVisibleMenuItems(menuItems.value))

const activeMenu = computed(() => resolveActiveMenuPath(route.path, menuItems.value))
</script>

<style scoped>
:deep(.el-menu) {
  border-right: 0;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
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

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background: rgba(255, 255, 255, 0.8);
}

:deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, rgba(255, 237, 213, 1) 0%, rgba(255, 255, 255, 1) 100%);
  box-shadow: 0 10px 24px rgba(249, 115, 22, 0.12);
}

:deep(.el-menu-item.is-active .menu-icon),
:deep(.el-sub-menu.is-active > .el-sub-menu__title .menu-icon) {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  color: white;
  box-shadow: none;
}
</style>
