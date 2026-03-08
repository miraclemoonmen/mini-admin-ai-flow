<template>
  <section class="flex min-h-screen items-center justify-center bg-[#fff8f1] px-4 py-8">
    <div class="w-full max-w-[720px] rounded-[34px] border border-orange-100 bg-white/94 p-8 shadow-[0_24px_70px_rgba(249,115,22,0.1)] md:p-10">
      <div class="space-y-6 text-center">
        <p class="text-xs uppercase tracking-[0.34em] text-orange-400">Page Missing</p>
        <h1 class="text-5xl font-semibold text-slate-900 md:text-6xl">404</h1>
        <p class="mx-auto max-w-[440px] text-base leading-7 text-slate-600">
          这个页面不存在，可能是地址输入错误，或者当前系统中还没有对应的业务页面。
        </p>

        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <el-button type="primary" round @click="goHome">返回首页</el-button>
          <el-button round @click="goLogin">回到登录页</el-button>
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

async function goLogin() {
  await router.push('/login')
}
</script>
