<template>
  <section class="login-page h-screen overflow-hidden bg-[#fff8f1] px-4 py-4 text-slate-900 md:px-6 md:py-6">
    <div class="mx-auto flex h-full max-w-[440px] items-center justify-center">
      <el-card shadow="never" class="login-card w-full !border-0">
        <div class="space-y-5">
          <div class="space-y-2 text-center lg:text-left">
            <p class="text-xs uppercase tracking-[0.34em] text-orange-400">Welcome Back</p>
            <h2 class="text-3xl font-semibold text-slate-900">欢迎回来</h2>
            <p class="text-sm leading-6 text-slate-500">
              使用企业账号登录，继续处理今日询盘、打样与出运安排。
            </p>
          </div>

          <el-form label-position="top" size="large" class="login-form space-y-1">
            <el-form-item label="账号">
              <el-input v-model="form.account" placeholder="请输入邮箱或员工编号" />
            </el-form-item>

            <el-form-item label="密码">
              <el-input
                v-model="form.password"
                type="password"
                show-password
                placeholder="请输入登录密码"
              />
            </el-form-item>

            <div class="flex items-center justify-between gap-3 pb-1">
              <el-checkbox v-model="form.remember">记住本次登录</el-checkbox>
              <button type="button" class="text-sm text-orange-500 transition hover:text-orange-600">忘记密码</button>
            </div>

            <el-button type="primary" size="large" class="login-button w-full">登录运营台</el-button>
          </el-form>

          <div class="rounded-[22px] border border-orange-100 bg-[#fff8f3] px-4 py-4">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-slate-900">演示入口</p>
                <p class="mt-1 text-xs leading-5 text-slate-500">当前仍为静态演示，可先进入看板查看布局效果。</p>
              </div>
              <RouterLink
                to="/"
                class="entry-link inline-flex shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition"
              >
                进入看板
              </RouterLink>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

const form = reactive({
  account: '',
  password: '',
  remember: true,
})
</script>

<style scoped>
.login-page {
  background:
    radial-gradient(circle at top left, rgba(251, 191, 36, 0.16), transparent 26%),
    radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.14), transparent 30%),
    linear-gradient(180deg, #fff8f1 0%, #fff3e7 100%);
}

.login-card {
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 56px rgba(249, 115, 22, 0.12);
}

.login-button {
  height: 48px;
  border-radius: 999px;
  box-shadow: 0 16px 28px rgba(249, 115, 22, 0.2);
}

:deep(.login-form .el-input__wrapper) {
  min-height: 48px;
}

.entry-link {
  border: 1px solid var(--el-button-border-color);
  background: var(--el-bg-color-overlay);
  color: var(--el-color-primary);
}

.entry-link:hover {
  border-color: var(--el-button-hover-border-color);
  background: var(--el-color-primary-light-9);
}

</style>
