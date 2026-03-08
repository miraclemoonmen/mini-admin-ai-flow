<template>
  <section
    class="login-page min-h-screen bg-[#fff8f1] px-4 py-4 text-slate-900 md:px-6 md:py-6"
  >
    <div class="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl items-stretch md:min-h-[calc(100vh-3rem)]">
      <div
        class="grid w-full overflow-hidden rounded-[36px] border border-orange-100/80 bg-white/70 shadow-[0_30px_80px_rgba(249,115,22,0.14)] lg:grid-cols-[1.12fr_0.88fr]"
      >
        <aside class="brand-panel relative hidden overflow-hidden lg:flex">
          <div class="brand-gradient absolute inset-0"></div>
          <div class="brand-orb brand-orb-one"></div>
          <div class="brand-orb brand-orb-two"></div>

          <div class="relative z-10 flex w-full flex-col justify-between p-10 xl:p-12">
            <div class="space-y-6">
              <div class="space-y-3">
                <p class="text-xs uppercase tracking-[0.34em] text-orange-200">
                  Furniture Export Studio
                </p>
                <h1 class="max-w-[460px] text-4xl font-semibold leading-tight text-white xl:text-5xl">
                  让订单履约、打样推进和出运节奏在一个后台里闭环。
                </h1>
                <p class="max-w-[460px] text-sm leading-7 text-orange-50/88">
                  面向外贸家居团队的运营工作台，聚焦询盘转化、排产协同、单证节奏和交付风险。
                </p>
              </div>

              <div class="grid gap-3">
                <div v-for="item in brandHighlights" :key="item.title" class="highlight-item">
                  <div class="highlight-icon">{{ item.icon }}</div>
                  <div>
                    <p class="text-sm font-semibold text-white">{{ item.title }}</p>
                    <p class="mt-1 text-xs leading-5 text-orange-50/78">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur-sm">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm text-orange-100/86">今日履约节奏</p>
                    <p class="mt-2 text-3xl font-semibold text-white">24 笔</p>
                  </div>
                  <div class="rounded-full border border-white/16 bg-white/12 px-4 py-2 text-sm text-white">
                    4 笔需重点跟进
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div class="flex items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,247,237,0.92))] px-4 py-6 sm:px-8 lg:px-10">
          <el-card shadow="never" class="login-card w-full max-w-[440px] !border-0">
            <div class="space-y-6">
              <div class="space-y-2">
                <p class="text-xs uppercase tracking-[0.34em] text-orange-400">Welcome Back</p>
                <h2 class="text-3xl font-semibold text-slate-900">欢迎回来</h2>
                <p class="text-sm leading-6 text-slate-500">
                  使用企业账号登录，继续处理今日询盘、打样与出运安排。
                </p>
              </div>

              <div class="demo-box">
                <div>
                  <div>
                    <p class="text-sm font-semibold text-slate-900">演示账号</p>
                    <p class="mt-1 text-xs leading-5 text-slate-500">
                      默认已填入一组可登录账号，你也可以随时重置。
                    </p>
                  </div>
                </div>

                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                  <div class="demo-chip">
                    <span class="demo-chip-label">账号</span>
                    <strong>{{ demoCredentials.account }}</strong>
                  </div>
                  <div class="demo-chip">
                    <span class="demo-chip-label">密码</span>
                    <strong>{{ demoCredentials.password }}</strong>
                  </div>
                </div>

                <div class="mt-4 flex flex-wrap gap-2">
                  <button
                    v-for="item in switchableAccounts"
                    :key="item.account"
                    type="button"
                    class="account-switch"
                    :class="{ 'account-switch-active': form.account === item.account }"
                    @click="switchDemoAccount(item.account)"
                  >
                    {{ item.label }}
                  </button>
                </div>
              </div>

              <el-alert
                v-if="errorMessage"
                type="error"
                :closable="false"
                show-icon
                class="error-alert"
                :title="errorMessage"
              />

              <el-form
                ref="formRef"
                :model="form"
                :rules="rules"
                label-position="top"
                size="large"
                status-icon
                class="login-form space-y-1"
                @submit.prevent="handleLogin"
              >
                <el-form-item label="账号" prop="account">
                  <el-input
                    v-model="form.account"
                    placeholder="请输入邮箱或员工编号"
                    @keyup.enter="handleLogin"
                  />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                  <el-input
                    v-model="form.password"
                    type="password"
                    show-password
                    placeholder="请输入登录密码"
                    @keyup.enter="handleLogin"
                  />
                </el-form-item>

                <div class="flex items-center justify-between gap-3 pb-1">
                  <el-checkbox v-model="form.remember">记住本次登录</el-checkbox>
                  <span class="text-xs text-slate-400">支持刷新后恢复登录态</span>
                </div>

                <el-button
                  type="primary"
                  size="large"
                  class="login-button mt-2 w-full"
                  :loading="submitting"
                  @click="handleLogin"
                >
                  登录运营台
                </el-button>
              </el-form>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

import { getDemoCredentials, getSwitchableDemoAccounts } from '@/api/modules/auth'
import { useAuthStore } from '@/stores/modules/auth'

interface LoginForm {
  account: string
  password: string
  remember: boolean
}

const brandHighlights = [
  {
    icon: '询',
    title: '询盘到订单节奏统一收敛',
    description: '把客户跟进和正式单推进放到一条业务链里看。',
  },
  {
    icon: '履',
    title: '履约节点可视化',
    description: '围绕排产、验货和出运节点统一追踪异常。',
  },
]

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const demoCredentials = getDemoCredentials()
const switchableAccounts = getSwitchableDemoAccounts()
const formRef = ref<FormInstance>()
const submitting = ref(false)
const errorMessage = ref('')

const form = reactive<LoginForm>({
  account: demoCredentials.account,
  password: demoCredentials.password,
  remember: true,
})

const rules: FormRules<LoginForm> = {
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
    {
      min: 4,
      message: '账号长度至少 4 位',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      min: 6,
      message: '密码长度至少 6 位',
      trigger: 'blur',
    },
  ],
}

function switchDemoAccount(account: string) {
  const targetAccount = switchableAccounts.find((item) => item.account === account)

  if (!targetAccount) {
    return
  }

  form.account = targetAccount.account
  form.password = targetAccount.password
  errorMessage.value = ''
}

async function handleLogin() {
  if (submitting.value) {
    return
  }

  const isValid = await formRef.value?.validate().catch(() => false)

  if (!isValid) {
    return
  }

  submitting.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.login({
      account: form.account,
      password: form.password,
      rememberMe: form.remember,
    })

    if (result.code !== 0) {
      errorMessage.value = result.msg
      return
    }

    ElMessage.success('登录成功')

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.replace(redirect)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.login-page {
  background:
    radial-gradient(circle at top left, rgba(251, 191, 36, 0.16), transparent 26%),
    radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.14), transparent 32%),
    linear-gradient(180deg, #fff8f1 0%, #fff2e3 100%);
}

.brand-panel {
  background: linear-gradient(180deg, #552209 0%, #7c2d12 46%, #9a3412 100%);
}

.brand-gradient {
  background:
    radial-gradient(circle at 16% 18%, rgba(251, 191, 36, 0.25), transparent 24%),
    radial-gradient(circle at 82% 22%, rgba(255, 255, 255, 0.16), transparent 20%),
    linear-gradient(135deg, rgba(251, 191, 36, 0.06), rgba(255, 255, 255, 0));
}

.brand-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(0);
}

.brand-orb-one {
  right: -42px;
  top: 58px;
  height: 180px;
  width: 180px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.22), rgba(251, 191, 36, 0));
}

.brand-orb-two {
  bottom: 72px;
  left: -56px;
  height: 220px;
  width: 220px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0));
}

.highlight-item,
.mini-card {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
}

.highlight-item {
  display: flex;
  gap: 14px;
  padding: 15px 18px;
}

.highlight-icon {
  display: flex;
  height: 42px;
  width: 42px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.14);
  color: white;
  font-size: 16px;
  font-weight: 700;
}

.login-card {
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 24px 56px rgba(249, 115, 22, 0.1);
}

.demo-box {
  border-radius: 24px;
  border: 1px solid rgba(251, 191, 36, 0.16);
  background:
    linear-gradient(180deg, rgba(255, 247, 237, 0.94), rgba(255, 251, 235, 0.9));
  padding: 18px;
}

.demo-chip {
  border-radius: 18px;
  border: 1px solid rgba(251, 191, 36, 0.16);
  background: rgba(255, 255, 255, 0.8);
  padding: 12px 14px;
}

.demo-chip-label {
  display: block;
  font-size: 12px;
  color: rgb(100 116 139);
}

.demo-chip strong {
  display: block;
  margin-top: 6px;
  font-size: 14px;
  color: rgb(15 23 42);
}

.error-alert {
  border-radius: 20px;
}

.account-switch {
  border-radius: 9999px;
  border: 1px solid rgba(251, 191, 36, 0.16);
  background: rgba(255, 255, 255, 0.82);
  padding: 8px 14px;
  color: rgb(71 85 105);
  font-size: 13px;
  font-weight: 600;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.account-switch:hover {
  border-color: rgba(251, 146, 60, 0.28);
  background: rgba(255, 247, 237, 0.94);
  color: rgb(154 52 18);
}

.account-switch-active {
  border-color: rgba(251, 146, 60, 0.2);
  background: linear-gradient(135deg, rgba(255, 237, 213, 1), rgba(255, 247, 237, 0.96));
  color: rgb(154 52 18);
  box-shadow: 0 10px 20px rgba(249, 115, 22, 0.08);
}

.login-button {
  height: 48px;
  border-radius: 999px;
  box-shadow: 0 16px 28px rgba(249, 115, 22, 0.2);
}

:deep(.login-form .el-input__wrapper) {
  min-height: 48px;
}

@media (max-width: 1023px) {
  .login-card {
    max-width: 100%;
  }
}
</style>
