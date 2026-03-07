<template>
  <section class="space-y-6">
    <header class="space-y-2">
      <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Overview</p>
      <h1 class="text-3xl font-semibold text-slate-900">Dashboard</h1>
      <p class="text-sm text-slate-500">后台管理前端项目初始化已完成，当前处于基础结构搭建阶段。</p>
    </header>

    <div class="grid gap-4 md:grid-cols-3">
      <article
        v-for="item in cards"
        :key="item.label"
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm text-slate-500">{{ item.label }}</p>
        <p class="mt-3 text-2xl font-semibold text-slate-900">{{ item.value }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  { label: 'Project Status', value: 'Bootstrapped' },
  { label: 'Package Manager', value: 'npm' },
  { label: 'UI Framework', value: 'Element Plus' },
]
</script>
