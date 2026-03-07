<template>
  <section class="space-y-6">
    <el-row :gutter="20">
      <el-col :xs="24" :lg="16">
        <el-card shadow="never" class="hero-card !border-0">
          <div class="hero-overlay"></div>
          <div class="hero-grid relative z-[1] grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div class="space-y-5">
              <div class="space-y-3">
                <p class="text-xs uppercase tracking-[0.34em] text-orange-400">Spring Export Edit</p>
                <h1 class="max-w-xl text-3xl font-semibold leading-tight text-slate-900">
                  外贸家居春季经营看板
                </h1>
                <p class="max-w-2xl text-sm leading-7 text-slate-600">
                  聚焦北美与欧洲家居买手市场，围绕藤编收纳、客厅软装与轻量家具三条主线，平衡询盘热度、样品效率与履约节奏。
                </p>
              </div>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in focusTags"
                  :key="tag"
                  class="rounded-full border border-orange-200 bg-white/90 px-3 py-1 text-xs font-medium text-orange-600 shadow-[0_8px_18px_rgba(249,115,22,0.06)]"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="rounded-[28px] border border-orange-100 bg-white/80 px-5 py-5 shadow-[0_16px_38px_rgba(148,76,20,0.08)] backdrop-blur-sm">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">本季风格摘要</p>
                    <p class="mt-2 text-xs leading-6 text-slate-500">
                      低饱和奶油白、浅橡木与藤编混搭继续上行，买手更偏好轻体积、好陈列、可组合的居家单品。
                    </p>
                  </div>
                  <div class="hidden h-16 w-px bg-orange-100 lg:block"></div>
                  <div class="min-w-[130px] rounded-[22px] bg-[#fff7f0] px-4 py-3 text-right">
                    <p class="text-xs text-slate-500">高潜市场</p>
                    <p class="mt-2 text-base font-semibold text-slate-900">美国 / 德国 / 波兰</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex h-full flex-col gap-4">
              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-[26px] border border-orange-100 bg-white/92 px-4 py-4 shadow-[0_14px_28px_rgba(249,115,22,0.06)]">
                  <p class="text-xs text-slate-500">今日询盘</p>
                  <p class="mt-3 text-3xl font-semibold text-slate-900">86</p>
                  <p class="mt-2 text-xs text-emerald-600">较昨日 +12%</p>
                </div>
                <div class="rounded-[26px] border border-orange-100 bg-white/92 px-4 py-4 shadow-[0_14px_28px_rgba(249,115,22,0.06)]">
                  <p class="text-xs text-slate-500">样品待发</p>
                  <p class="mt-3 text-3xl font-semibold text-slate-900">14</p>
                  <p class="mt-2 text-xs text-slate-500">含 6 单高优先级</p>
                </div>
              </div>

              <div class="flex-1 rounded-[30px] border border-orange-100 bg-white/86 px-5 py-5 shadow-[0_18px_36px_rgba(249,115,22,0.07)] backdrop-blur-sm">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-semibold text-slate-900">今日关注</p>
                  <span class="text-xs text-orange-500">Buyer Signals</span>
                </div>
                <div class="mt-4 space-y-4">
                  <div v-for="item in heroSignals" :key="item.title" class="rounded-[22px] bg-[#fffaf6] px-4 py-4">
                    <div class="flex items-center justify-between gap-3">
                      <p class="text-sm font-medium text-slate-900">{{ item.title }}</p>
                      <span class="text-xs font-medium text-orange-500">{{ item.badge }}</span>
                    </div>
                    <p class="mt-2 text-xs leading-6 text-slate-500">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="8">
        <el-card shadow="never" class="soft-card h-full">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-slate-900">渠道状态</span>
              <el-tag round class="!border-0 !bg-emerald-50 !text-emerald-600">平稳</el-tag>
            </div>
          </template>

          <div class="space-y-4">
            <div v-for="item in channelStatus" :key="item.label" class="rounded-[24px] bg-orange-50/80 px-4 py-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-500">{{ item.label }}</span>
                <span class="font-semibold text-slate-900">{{ item.value }}</span>
              </div>
              <el-progress
                :percentage="item.percent"
                :color="item.color"
                :show-text="false"
                class="mt-3"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col v-for="item in summaryCards" :key="item.label" :xs="24" :sm="12" :xl="6">
        <el-card shadow="hover" class="soft-card card-lift">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm text-slate-500">{{ item.label }}</p>
              <p class="mt-3 text-3xl font-semibold text-slate-900">{{ item.value }}</p>
              <p class="mt-2 text-xs" :class="item.trendClass">{{ item.trend }}</p>
            </div>
            <el-tag :type="item.tagType" effect="plain" round>{{ item.tag }}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :xl="16">
        <el-card shadow="never" class="soft-card">
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-base font-semibold text-slate-900">本周重点跟进</p>
                <p class="mt-1 text-sm text-slate-500">围绕新品打样、买手回复和集装箱排期安排外贸家居业务节奏。</p>
              </div>
              <el-button round class="!border-orange-200 !bg-orange-50 !text-orange-600">新增跟进</el-button>
            </div>
          </template>

          <el-table :data="todoList" stripe style="width: 100%">
            <el-table-column prop="name" label="任务事项" min-width="240" />
            <el-table-column prop="owner" label="负责人" width="120" />
            <el-table-column prop="deadline" label="时间节点" width="140" />
            <el-table-column label="优先级" width="120">
              <template #default="{ row }">
                <el-tag :type="row.priorityType" round>{{ row.priority }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="140">
              <template #default="{ row }">
                <el-tag :type="row.statusType" effect="light" round>{{ row.status }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :xs="24" :xl="8">
        <el-card shadow="never" class="soft-card">
          <template #header>
            <span class="font-semibold text-slate-900">快捷操作</span>
          </template>

          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="action in quickActions"
              :key="action.title"
              type="button"
              class="rounded-[24px] border border-orange-100 bg-orange-50/70 px-4 py-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-white"
            >
              <p class="text-sm font-semibold text-slate-900">{{ action.title }}</p>
              <p class="mt-2 text-xs leading-5 text-slate-500">{{ action.description }}</p>
            </button>
          </div>

          <el-divider />

          <div class="space-y-3">
            <div v-for="item in notices" :key="item.title" class="rounded-[22px] border border-orange-100 bg-white px-4 py-4">
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-medium text-slate-900">{{ item.title }}</p>
                <el-tag size="small" :type="item.type" round>{{ item.level }}</el-tag>
              </div>
              <p class="mt-2 text-xs leading-5 text-slate-500">{{ item.description }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script setup lang="ts">
const focusTags = ['北美客厅系列', '藤编收纳', '奶油白软装', '轻量家具', '高复购买手']

const channelStatus = [
  { label: 'Alibaba 国际站', value: '询盘转化 31%', percent: 82, color: '#fb923c' },
  { label: '独立站样品页', value: '加购率 18%', percent: 66, color: '#f97316' },
  { label: '海外仓备货', value: '库存健康 74%', percent: 74, color: '#34d399' },
]

const summaryCards = [
  {
    label: '今日意向成交额',
    value: '$128,600',
    trend: '较昨日提升 9.4%',
    trendClass: 'text-emerald-600',
    tag: '成交',
    tagType: 'success',
  },
  {
    label: '新品打样数',
    value: '24',
    trend: '藤编与布艺系列最受关注',
    trendClass: 'text-orange-500',
    tag: '打样',
    tagType: 'warning',
  },
  {
    label: '待回复买家',
    value: '19',
    trend: '欧美买手回复时效需提升',
    trendClass: 'text-rose-500',
    tag: '询盘',
    tagType: 'danger',
  },
  {
    label: '装柜排期',
    value: '6',
    trend: '本周 2 个柜需锁舱',
    trendClass: 'text-cyan-600',
    tag: '履约',
    tagType: 'primary',
  },
]

const heroSignals = [
  {
    title: '北美客厅边几询盘上升',
    badge: '本周 +18%',
    description: '藤编边几与可拆装茶几点击率明显增长，可优先安排样品拍摄和报价跟进。',
  },
  {
    title: '欧洲收纳系列关注度提升',
    badge: '德国 / 波兰',
    description: '浅木色收纳柜与布艺靠垫组合表现更好，适合继续扩充搭配场景。',
  },
]

const todoList = [
  {
    name: '确认北美春季客厅边几样品面料与包装卡',
    owner: 'Mia',
    deadline: '03-08 14:00',
    priority: '高',
    priorityType: 'danger',
    status: '进行中',
    statusType: 'primary',
  },
  {
    name: '回复德国买手关于藤编收纳篮 MOQ 与交期问题',
    owner: 'Leo',
    deadline: '03-08 16:30',
    priority: '中',
    priorityType: 'warning',
    status: '待处理',
    statusType: 'warning',
  },
  {
    name: '整理本周独立站轻奢餐椅询盘关键词报告',
    owner: 'Ava',
    deadline: '03-09 10:00',
    priority: '低',
    priorityType: 'success',
    status: '已排期',
    statusType: 'info',
  },
  {
    name: '确认波兰海外仓布艺靠垫补货与清关资料',
    owner: 'Noah',
    deadline: '03-09 18:00',
    priority: '高',
    priorityType: 'danger',
    status: '待确认',
    statusType: 'danger',
  },
]

const quickActions = [
  { title: '新增样品单', description: '快速创建家居新品打样与寄样流程。' },
  { title: '导出询盘', description: '导出平台询盘与重点买家跟进清单。' },
  { title: '更新报价', description: '同步最新材质、运费和柜量报价。' },
  { title: '发布新品', description: '上架本周主推的客厅与收纳系列。' },
]

const notices = [
  {
    title: '春季新品拍摄排期已确认',
    description: '本周三完成藤编收纳与布艺软装主图拍摄，周四可同步上架国际站。',
    level: '日程',
    type: 'success',
  },
  {
    title: '美西港口舱位偏紧',
    description: '三月下旬出运订单建议提前锁舱，避免客厅家具大件延误。',
    level: '提醒',
    type: 'warning',
  },
  {
    title: '欧洲买手偏好更新',
    description: '浅橡木、奶油白和藤编混搭系列点击率明显提升，可优先扩展选品。',
    level: '趋势',
    type: 'info',
  },
]
</script>

<style scoped>
.hero-card {
  border-radius: 32px;
  background:
    radial-gradient(circle at top right, rgba(251, 191, 36, 0.14), transparent 34%),
    linear-gradient(180deg, #fffaf6 0%, #fff4ec 100%);
  box-shadow: 0 18px 42px rgba(249, 115, 22, 0.1);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.62) 0%, rgba(255, 255, 255, 0) 42%),
    radial-gradient(circle at 80% 14%, rgba(251, 191, 36, 0.18), transparent 26%);
  pointer-events: none;
}

.soft-card {
  border-radius: 28px;
  border: 1px solid rgba(251, 191, 36, 0.18);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 36px rgba(249, 115, 22, 0.08);
}

.card-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(249, 115, 22, 0.14);
}

:deep(.el-card__header) {
  border-bottom: 0;
  padding-bottom: 0;
}

:deep(.el-card__body) {
  padding-top: 20px;
}

:deep(.el-table) {
  --el-table-border-color: rgba(251, 191, 36, 0.18);
  --el-table-header-bg-color: rgba(255, 247, 237, 0.95);
  --el-table-row-hover-bg-color: rgba(255, 247, 237, 0.85);
  border-radius: 22px;
  overflow: hidden;
}
</style>
