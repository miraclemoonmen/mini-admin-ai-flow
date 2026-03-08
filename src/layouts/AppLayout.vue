<template>
  <el-container class="h-screen overflow-hidden bg-[#fff8f1] text-slate-900">
    <AppSidebar />

    <el-container class="h-screen overflow-hidden">
      <div class="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <AppHeader />

        <el-main
          class="app-main-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-5"
        >
          <RouterView />
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
</script>
