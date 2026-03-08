<template>
  <section class="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-8">
    <div class="w-full max-w-[720px] rounded-[32px] border border-orange-100 bg-white/92 p-8 shadow-[0_20px_60px_rgba(249,115,22,0.1)] md:p-10">
      <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div class="space-y-4">
          <p class="text-xs uppercase tracking-[0.34em] text-orange-400">Access Restricted</p>
          <h1 class="text-4xl font-semibold text-slate-900 md:text-5xl">403</h1>
          <p class="max-w-[420px] text-base leading-7 text-slate-600">
            当前账号已登录，但没有访问这个页面的菜单权限。你可以返回首页，或者切换到具备更完整菜单的账号。
          </p>

          <div class="flex flex-wrap gap-3 pt-2">
            <el-button type="primary" round @click="goHome">返回首页</el-button>
            <el-button round @click="goBack">返回上一页</el-button>
          </div>
        </div>

        <div class="forbidden-card">
          <p class="text-sm text-orange-100/90">当前建议</p>
          <p class="mt-3 text-2xl font-semibold text-white">切换具备完整菜单的账号</p>
          <p class="mt-3 text-sm leading-6 text-orange-50/82">
            例如使用 `mia.chen` 登录，可查看更完整的后台导航和业务页面。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

async function goHome() {
  await router.push('/')
}

function goBack() {
  void router.back()
}
</script>

<style scoped>
.forbidden-card {
  width: 100%;
  max-width: 260px;
  border-radius: 28px;
  background: linear-gradient(160deg, #7c2d12 0%, #9a3412 58%, #c2410c 100%);
  padding: 22px;
  box-shadow: 0 18px 40px rgba(154, 52, 18, 0.22);
}
</style>
