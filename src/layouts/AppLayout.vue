<template>
  <el-container class="min-h-screen bg-slate-100 text-slate-900">
    <el-aside width="220px" class="border-r border-slate-200 bg-white">
      <div class="px-6 py-5 text-lg font-semibold">Mini Admin</div>
      <nav class="px-3 pb-4">
        <RouterLink
          to="/"
          class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Dashboard
        </RouterLink>
      </nav>
    </el-aside>

    <el-container>
      <el-header class="flex items-center justify-between border-b border-slate-200 bg-white px-6">
        <div class="text-base font-semibold">Admin Console</div>
      </el-header>
      <el-main class="p-6">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
