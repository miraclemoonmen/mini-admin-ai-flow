<template>
  <section v-if="order && detailRecord" class="space-y-5">
    <el-card shadow="never" class="hero-card">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-3">
            <el-button round @click="goBack">返回列表</el-button>
            <el-tag round effect="light" class="warm-tag">{{ order.orderStatus }}</el-tag>
            <el-tag :type="paymentStatusTagType(order.paymentStatus)" round effect="light">
              {{ order.paymentStatus }}
            </el-tag>
            <el-tag :type="riskLevelTagType(order.riskLevel)" round effect="light">
              {{ order.riskLevel }}风险
            </el-tag>
          </div>

          <div>
            <p class="text-sm text-slate-500">订单履约详情</p>
            <h1 class="mt-2 text-3xl font-semibold text-slate-900">{{ order.orderNo }}</h1>
            <p class="mt-2 text-sm text-slate-600">
              {{ order.customerName }} / {{ order.companyName }} · {{ order.country }} ·
              {{ order.channel }}
            </p>
          </div>

          <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div class="metric-chip">
              <p class="metric-label">负责人</p>
              <p class="metric-value">{{ order.owner }}</p>
            </div>
            <div class="metric-chip">
              <p class="metric-label">下单日期</p>
              <p class="metric-value">{{ order.orderDate }}</p>
            </div>
            <div class="metric-chip">
              <p class="metric-label">ETD</p>
              <p class="metric-value">{{ order.etd }}</p>
            </div>
            <div class="metric-chip">
              <p class="metric-label">订单金额</p>
              <p class="metric-value">{{ formatAmount(order.orderAmount) }}</p>
            </div>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:w-[360px] xl:grid-cols-1">
          <div class="highlight-card">
            <p class="text-sm text-slate-500">当前优先级</p>
            <p class="mt-2 text-2xl font-semibold text-slate-900">
              {{ detailRecord.overview.priorityLevel }}
            </p>
            <p class="mt-2 text-sm text-slate-600">
              最新异常：{{ detailRecord.overview.latestException }}
            </p>
          </div>
          <div class="highlight-card">
            <p class="text-sm text-slate-500">下一步动作</p>
            <p class="mt-2 text-lg font-semibold text-slate-900">
              {{ detailRecord.overview.nextAction }}
            </p>
            <p class="mt-2 text-sm text-slate-600">
              交付压力：{{ detailRecord.overview.deliveryPressure }}
            </p>
          </div>
        </div>
      </div>
    </el-card>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <el-card shadow="never" class="summary-card">
        <p class="text-sm text-slate-500">订单老化天数</p>
        <p class="mt-3 text-3xl font-semibold text-slate-900">
          {{ detailRecord.overview.orderAgingDays }}
        </p>
        <p class="mt-2 text-xs text-slate-500">按下单日至当前业务视角估算</p>
      </el-card>
      <el-card shadow="never" class="summary-card">
        <p class="text-sm text-slate-500">预计毛利率</p>
        <p class="mt-3 text-3xl font-semibold text-slate-900">
          {{ detailRecord.overview.expectedGrossMargin }}%
        </p>
        <p class="mt-2 text-xs text-emerald-600">用于预估项目利润空间</p>
      </el-card>
      <el-card shadow="never" class="summary-card">
        <p class="text-sm text-slate-500">生产进度</p>
        <p class="mt-3 text-3xl font-semibold text-slate-900">{{ order.productionProgress }}%</p>
        <p class="mt-2 text-xs text-orange-500">结合履约节点动态更新</p>
      </el-card>
      <el-card shadow="never" class="summary-card">
        <p class="text-sm text-slate-500">客户层级</p>
        <p class="mt-3 text-3xl font-semibold text-slate-900">
          {{ detailRecord.overview.buyerTier }}
        </p>
        <p class="mt-2 text-xs text-rose-500">区域负责人：{{ detailRecord.overview.regionManager }}</p>
      </el-card>
    </div>

    <div class="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <el-card shadow="never" class="detail-card">
        <template #header>
          <div>
            <p class="text-base font-semibold text-slate-900">履约进度</p>
            <p class="mt-1 text-sm text-slate-500">按关键节点跟踪当前订单执行情况。</p>
          </div>
        </template>

        <div class="space-y-4">
          <div
            v-for="(item, index) in detailRecord.milestones"
            :key="item.stage"
            class="timeline-item"
          >
            <div class="timeline-marker">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <p class="text-base font-semibold text-slate-900">{{ item.stage }}</p>
                <el-tag :type="milestoneStatusTagType(item.status)" round effect="light">
                  {{ item.status }}
                </el-tag>
              </div>
              <div class="mt-2 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                <p>责任角色：{{ item.owner }}</p>
                <p>目标日期：{{ item.targetDate || '-' }}</p>
                <p>实际日期：{{ item.actualDate || '-' }}</p>
                <p>节点备注：{{ item.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <div class="space-y-5">
        <el-card shadow="never" class="detail-card">
          <template #header>
            <div>
              <p class="text-base font-semibold text-slate-900">物流与单证</p>
              <p class="mt-1 text-sm text-slate-500">出运安排、报关与单证状态总览。</p>
            </div>
          </template>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="info-block">
              <p class="info-label">贸易术语</p>
              <p class="info-value">{{ detailRecord.logistics.incoterm }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">运输方式</p>
              <p class="info-value">{{ detailRecord.logistics.shippingMethod }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">起运港</p>
              <p class="info-value">{{ detailRecord.logistics.loadingPort }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">目的港</p>
              <p class="info-value">{{ detailRecord.logistics.destinationPort }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">柜型</p>
              <p class="info-value">{{ detailRecord.logistics.containerType }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">订舱号</p>
              <p class="info-value">{{ detailRecord.logistics.bookingNo }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">提单号</p>
              <p class="info-value">{{ detailRecord.logistics.blNo }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">报关状态</p>
              <p class="info-value">{{ detailRecord.logistics.customsStatus }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">拖车状态</p>
              <p class="info-value">{{ detailRecord.logistics.trailerStatus }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">仓库状态</p>
              <p class="info-value">{{ detailRecord.logistics.warehouseStatus }}</p>
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="detail-card">
          <template #header>
            <div>
              <p class="text-base font-semibold text-slate-900">风险与跟进</p>
              <p class="mt-1 text-sm text-slate-500">聚焦异常原因、当前动作和沟通记录。</p>
            </div>
          </template>

          <div class="flex flex-wrap gap-2">
            <el-tag :type="riskLevelTagType(order.riskLevel)" round effect="light">
              {{ order.riskLevel }}风险
            </el-tag>
            <el-tag v-for="tag in order.riskTags" :key="tag" round effect="plain" class="risk-chip">
              {{ tag }}
            </el-tag>
          </div>

          <div class="mt-4 space-y-3">
            <div
              v-for="item in detailRecord.followUps"
              :key="`${item.time}-${item.owner}`"
              class="followup-item"
            >
              <div class="flex flex-wrap items-center justify-between gap-2">
                <p class="text-sm font-semibold text-slate-900">{{ item.summary }}</p>
                <span class="text-xs text-slate-500">{{ item.time }}</span>
              </div>
              <p class="mt-2 text-sm text-slate-600">
                {{ item.owner }} · {{ item.channel }} · 下一步：{{ item.nextStep }}
              </p>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <el-card shadow="never" class="detail-card">
        <template #header>
          <div>
            <p class="text-base font-semibold text-slate-900">产品明细</p>
            <p class="mt-1 text-sm text-slate-500">SKU、材质、数量、箱规和总体积拆分展示。</p>
          </div>
        </template>

        <el-table :data="detailRecord.products" stripe>
          <el-table-column prop="sku" label="SKU" min-width="110" />
          <el-table-column prop="productName" label="产品名" min-width="150" />
          <el-table-column prop="specification" label="规格" min-width="120" />
          <el-table-column prop="material" label="材质" min-width="120" />
          <el-table-column prop="quantity" label="数量" width="90" align="right" />
          <el-table-column label="单价" width="110" align="right">
            <template #default="{ row }">{{ formatAmount(row.unitPrice) }}</template>
          </el-table-column>
          <el-table-column prop="cartons" label="箱数" width="90" align="right" />
          <el-table-column prop="volume" label="体积(m3)" width="110" align="right" />
        </el-table>
      </el-card>

      <div class="space-y-5">
        <el-card shadow="never" class="detail-card">
          <template #header>
            <div>
              <p class="text-base font-semibold text-slate-900">收款与费用</p>
              <p class="mt-1 text-sm text-slate-500">回款节点、结算方式和费用拆分。</p>
            </div>
          </template>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="info-block">
              <p class="info-label">定金比例</p>
              <p class="info-value">{{ detailRecord.paymentSummary.depositRatio }}%</p>
            </div>
            <div class="info-block">
              <p class="info-label">结算方式</p>
              <p class="info-value">{{ detailRecord.paymentSummary.settlementMethod }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">定金金额</p>
              <p class="info-value">{{ formatAmount(detailRecord.paymentSummary.depositAmount) }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">尾款金额</p>
              <p class="info-value">{{ formatAmount(detailRecord.paymentSummary.balanceAmount) }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">关税承担</p>
              <p class="info-value">{{ dutyModeLabel(detailRecord.paymentSummary.dutyMode) }}</p>
            </div>
            <div class="info-block">
              <p class="info-label">财务风险</p>
              <p class="info-value">
                <el-tag :type="riskLevelTagType(detailRecord.paymentSummary.financeRisk)" round>
                  {{ detailRecord.paymentSummary.financeRisk }}
                </el-tag>
              </p>
            </div>
          </div>

          <div class="mt-4 space-y-3">
            <div
              v-for="item in detailRecord.payments"
              :key="item.node"
              class="payment-row"
            >
              <div>
                <p class="text-sm font-semibold text-slate-900">{{ item.node }}</p>
                <p class="mt-1 text-xs text-slate-500">
                  应收 {{ item.dueDate }} / 实收 {{ item.receivedDate || '-' }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-slate-900">{{ formatAmount(item.amount) }}</p>
                <el-tag :type="paymentNodeTagType(item.status)" round effect="light">
                  {{ item.status }}
                </el-tag>
              </div>
            </div>
          </div>

          <div class="mt-4 rounded-[24px] border border-orange-100 bg-orange-50/60 p-4">
            <div class="space-y-2">
              <div
                v-for="item in detailRecord.fees"
                :key="item.label"
                class="flex items-center justify-between text-sm text-slate-600"
              >
                <span>{{ item.label }}</span>
                <span class="font-semibold text-slate-900">{{ formatAmount(item.amount) }}</span>
              </div>
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="detail-card">
          <template #header>
            <div>
              <p class="text-base font-semibold text-slate-900">单证清单</p>
              <p class="mt-1 text-sm text-slate-500">当前订单关键单证状态汇总。</p>
            </div>
          </template>

          <div class="space-y-3">
            <div
              v-for="item in detailRecord.documents"
              :key="item.name"
              class="document-row"
            >
              <div>
                <p class="text-sm font-semibold text-slate-900">{{ item.name }}</p>
                <p class="mt-1 text-xs text-slate-500">{{ item.owner }} · {{ item.note }}</p>
              </div>
              <el-tag :type="documentStatusTagType(item.status)" round effect="light">
                {{ item.status }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </section>

  <el-empty v-else description="未找到该订单详情">
    <el-button type="primary" round @click="goBack">返回列表</el-button>
  </el-empty>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import orderDetailResponse from '@/mock/order-fulfillment-detail.json'
import rawOrders from '@/mock/order-fulfillment.json'
import type { MockResponse } from '@/types'

type OrderItem = (typeof rawOrders)[number]

interface OrderOverview {
  priorityLevel: string
  buyerTier: string
  regionManager: string
  orderAgingDays: number
  expectedGrossMargin: number
  deliveryPressure: string
  latestException: string
  nextAction: string
}

interface MilestoneItem {
  stage: string
  status: string
  owner: string
  actualDate: string
  targetDate: string
  note: string
}

interface ProductItem {
  sku: string
  productName: string
  specification: string
  material: string
  quantity: number
  unitPrice: number
  cartons: number
  volume: number
}

interface PaymentSummary {
  depositRatio: number
  depositAmount: number
  balanceAmount: number
  settlementMethod: string
  dutyMode: string
  financeRisk: string
}

interface PaymentItem {
  node: string
  amount: number
  dueDate: string
  receivedDate: string
  status: string
}

interface FeeItem {
  label: string
  amount: number
}

interface LogisticsInfo {
  incoterm: string
  shippingMethod: string
  loadingPort: string
  destinationPort: string
  containerType: string
  bookingNo: string
  blNo: string
  customsStatus: string
  trailerStatus: string
  warehouseStatus: string
}

interface DocumentItem {
  name: string
  status: string
  owner: string
  note: string
}

interface FollowUpItem {
  time: string
  owner: string
  channel: string
  summary: string
  nextStep: string
}

interface OrderDetailRecord {
  id: number
  overview: OrderOverview
  milestones: MilestoneItem[]
  products: ProductItem[]
  paymentSummary: PaymentSummary
  payments: PaymentItem[]
  fees: FeeItem[]
  logistics: LogisticsInfo
  documents: DocumentItem[]
  followUps: FollowUpItem[]
}

const detailResponse = orderDetailResponse as MockResponse<OrderDetailRecord[]>
const route = useRoute()
const router = useRouter()

const orderId = computed(() => Number.parseInt(`${route.params.id ?? ''}`, 10))
const order = computed<OrderItem | undefined>(() =>
  rawOrders.find((item) => item.id === orderId.value),
)
const detailRecord = computed<OrderDetailRecord | undefined>(() =>
  detailResponse.code === 0 ? detailResponse.data.find((item) => item.id === orderId.value) : undefined,
)

function goBack() {
  if (window.history.length > 1) {
    void router.back()
    return
  }

  void router.push({
    name: 'OrderFulfillmentTracking',
  })
}

function formatAmount(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function paymentStatusTagType(status: string) {
  const typeMap: Record<string, string> = {
    待支付定金: 'danger',
    已付定金: 'warning',
    尾款待付: 'primary',
    已完成付款: 'success',
  }

  return typeMap[status] ?? 'info'
}

function riskLevelTagType(level: string) {
  const typeMap: Record<string, string> = {
    低: 'success',
    中: 'warning',
    高: 'danger',
  }

  return typeMap[level] ?? 'info'
}

function milestoneStatusTagType(status: string) {
  const typeMap: Record<string, string> = {
    已完成: 'success',
    进行中: 'warning',
    待执行: 'info',
  }

  return typeMap[status] ?? 'info'
}

function paymentNodeTagType(status: string) {
  const typeMap: Record<string, string> = {
    已到账: 'success',
    待到账: 'warning',
  }

  return typeMap[status] ?? 'info'
}

function documentStatusTagType(status: string) {
  const typeMap: Record<string, string> = {
    已归档: 'success',
    已确认: 'primary',
    待补充: 'warning',
  }

  return typeMap[status] ?? 'info'
}

function dutyModeLabel(mode: string) {
  const labelMap: Record<string, string> = {
    Buyer: '买方承担',
    Seller: '卖方承担',
    Shared: '双方分摊',
  }

  return labelMap[mode] ?? mode
}
</script>

<style scoped>
.hero-card,
.detail-card,
.summary-card {
  border-radius: 28px;
  border: 1px solid rgba(251, 191, 36, 0.18);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 16px 34px rgba(249, 115, 22, 0.08);
}

.warm-tag {
  --el-tag-bg-color: rgba(255, 247, 237, 1);
  --el-tag-border-color: rgba(253, 186, 116, 0.28);
  --el-tag-text-color: #c2410c;
}

.metric-chip,
.highlight-card,
.info-block,
.followup-item,
.payment-row,
.document-row {
  border-radius: 22px;
  border: 1px solid rgba(251, 191, 36, 0.16);
  background: rgba(255, 247, 237, 0.56);
  padding: 16px 18px;
}

.metric-label,
.info-label {
  font-size: 12px;
  color: rgb(100 116 139);
}

.metric-value,
.info-value {
  margin-top: 8px;
  font-size: 18px;
  font-weight: 600;
  color: rgb(15 23 42);
}

.timeline-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.timeline-item + .timeline-item {
  padding-top: 16px;
  border-top: 1px dashed rgba(251, 191, 36, 0.26);
}

.timeline-marker {
  display: flex;
  height: 34px;
  width: 34px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(249, 115, 22, 0.2));
  color: rgb(194 65 12);
  font-size: 14px;
  font-weight: 700;
}

.risk-chip {
  --el-tag-border-color: rgba(251, 146, 60, 0.24);
  --el-tag-bg-color: rgba(255, 247, 237, 0.9);
  --el-tag-text-color: #9a3412;
}
</style>
