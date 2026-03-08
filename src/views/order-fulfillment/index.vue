<template>
  <section class="space-y-5">
    <el-card shadow="never" class="query-card">
      <template #header>
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-base font-semibold text-slate-900">复杂查询</p>
            <p class="mt-1 text-sm text-slate-500">
              支持订单、客户、渠道、履约状态、风险和金额等多维组合筛选。
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <el-tag round effect="light" class="result-tag">
              当前命中 {{ filteredOrders.length }} 笔
            </el-tag>
            <el-button text class="px-0" @click="toggleAdvancedFilters">
              {{ advancedVisible ? '收起高级筛选' : '展开高级筛选' }}
            </el-button>
          </div>
        </div>
      </template>

      <el-form label-position="top" class="space-y-1">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <el-form-item label="订单 / 客户关键词">
            <el-input
              v-model="queryForm.keyword"
              placeholder="输入订单号、客户名或公司名"
              clearable
            />
          </el-form-item>

          <el-form-item label="国家 / 地区">
            <el-select v-model="queryForm.country" placeholder="全部国家" clearable>
              <el-option v-for="item in countryOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>

          <el-form-item label="订单状态">
            <el-select v-model="queryForm.orderStatus" placeholder="全部状态" clearable>
              <el-option
                v-for="item in orderStatusOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="付款状态">
            <el-select v-model="queryForm.paymentStatus" placeholder="全部付款状态" clearable>
              <el-option
                v-for="item in paymentStatusOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="下单日期">
            <el-date-picker
              v-model="queryForm.orderDateRange"
              type="daterange"
              value-format="YYYY-MM-DD"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="w-full"
            />
          </el-form-item>

          <el-form-item label="负责人">
            <el-select v-model="queryForm.owner" placeholder="全部负责人" clearable>
              <el-option v-for="item in ownerOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </div>

        <el-collapse-transition>
          <div v-show="advancedVisible" class="border-t border-orange-100 pt-5">
            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <el-form-item label="平台渠道">
                <el-select v-model="queryForm.channel" placeholder="全部渠道" clearable>
                  <el-option v-for="item in channelOptions" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>

              <el-form-item label="产品线">
                <el-select v-model="queryForm.productLine" placeholder="全部产品线" clearable>
                  <el-option
                    v-for="item in productLineOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="客户等级">
                <el-select v-model="queryForm.customerLevel" placeholder="全部客户等级" clearable>
                  <el-option
                    v-for="item in customerLevelOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="贸易方式">
                <el-select v-model="queryForm.tradeTerm" placeholder="全部贸易方式" clearable>
                  <el-option
                    v-for="item in tradeTermOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="运输方式">
                <el-select
                  v-model="queryForm.shippingMethod"
                  placeholder="全部运输方式"
                  clearable
                >
                  <el-option
                    v-for="item in shippingMethodOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="风险等级">
                <el-select v-model="queryForm.riskLevel" placeholder="全部风险等级" clearable>
                  <el-option
                    v-for="item in riskLevelOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="超期订单">
                <el-select v-model="queryForm.overdueOnly" placeholder="全部订单" clearable>
                  <el-option label="仅看超期" :value="true" />
                  <el-option label="仅看未超期" :value="false" />
                </el-select>
              </el-form-item>

              <el-form-item label="样品单">
                <el-select v-model="queryForm.sampleOnly" placeholder="全部订单" clearable>
                  <el-option label="仅看样品单" :value="true" />
                  <el-option label="仅看正式单" :value="false" />
                </el-select>
              </el-form-item>
            </div>

            <el-form-item label="订单金额区间（USD）" class="mt-1">
              <div class="rounded-[24px] border border-orange-100 bg-orange-50/50 px-4 py-4">
                <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span class="text-sm text-slate-500">拖动滑块筛选目标金额范围</span>
                  <span class="text-sm font-semibold text-slate-900">
                    {{ formatAmount(queryForm.amountRange[0]) }} -
                    {{ formatAmount(queryForm.amountRange[1]) }}
                  </span>
                </div>
                <el-slider
                  v-model="queryForm.amountRange"
                  range
                  :min="0"
                  :max="200000"
                  :step="5000"
                  :show-tooltip="false"
                />
              </div>
            </el-form-item>
          </div>
        </el-collapse-transition>

        <div class="flex flex-wrap gap-3 pt-1">
          <el-button type="primary" round @click="applyFilters">查询</el-button>
          <el-button round @click="resetFilters">重置</el-button>
          <p class="flex items-center text-sm text-slate-500">
            {{ hasActiveFilters ? '已应用组合筛选条件' : '当前为默认全量数据' }}
          </p>
        </div>
      </el-form>
    </el-card>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <el-card v-for="item in summaryCards" :key="item.label" shadow="never" class="summary-card">
        <p class="text-sm text-slate-500">{{ item.label }}</p>
        <p class="mt-3 text-3xl font-semibold text-slate-900">{{ item.value }}</p>
        <p class="mt-2 text-xs" :class="item.trendClass">{{ item.caption }}</p>
      </el-card>
    </div>

    <el-card shadow="never" class="table-card">
      <template #header>
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-base font-semibold text-slate-900">订单列表</p>
            <p class="mt-1 text-sm text-slate-500">
              当前显示第 {{ pageStart }} - {{ pageEnd }} 条，共 {{ filteredOrders.length }} 条结果。
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <el-tag round class="result-tag">高风险 {{ highRiskCount }} 笔</el-tag>
            <el-tag round type="danger">超期 {{ overdueCount }} 笔</el-tag>
            <el-tag round type="warning">样品 {{ sampleCount }} 笔</el-tag>
          </div>
        </div>
      </template>

      <el-table :data="paginatedOrders" stripe row-key="id" style="width: 100%">
        <el-table-column label="订单信息" min-width="260">
          <template #default="{ row }">
            <div class="space-y-1">
              <p class="font-semibold text-slate-900">{{ row.orderNo }}</p>
              <p class="text-sm text-slate-600">{{ row.customerName }} / {{ row.companyName }}</p>
              <p class="text-xs text-slate-500">{{ row.country }} · {{ row.channel }}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="下单日期" width="120">
          <template #default="{ row }">
            <span class="text-sm text-slate-600">{{ row.orderDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="业务维度" min-width="190">
          <template #default="{ row }">
            <div class="space-y-1 text-sm">
              <p class="text-slate-900">{{ row.productLine }}</p>
              <p class="text-slate-500">{{ row.tradeTerm }} · {{ row.shippingMethod }}</p>
              <p class="text-xs text-slate-500">客户等级：{{ row.customerLevel }}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="订单金额" width="140" align="right">
          <template #default="{ row }">
            <div class="text-right">
              <p class="font-semibold text-slate-900">{{ formatAmount(row.orderAmount) }}</p>
              <p class="text-xs text-slate-500">{{ row.currency }}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="付款状态" width="130">
          <template #default="{ row }">
            <el-tag :type="paymentStatusTagType(row.paymentStatus)" effect="light" round>
              {{ row.paymentStatus }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="生产进度" width="180">
          <template #default="{ row }">
            <div class="space-y-2">
              <span class="text-sm text-slate-600">{{ row.orderStatus }}</span>
              <el-progress
                :percentage="row.productionProgress"
                :show-text="false"
                :color="progressColor(row.productionProgress)"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="ETD / 负责人" width="150">
          <template #default="{ row }">
            <div class="space-y-1 text-sm">
              <p class="font-medium text-slate-900">{{ row.etd }}</p>
              <p class="text-slate-500">{{ row.owner }}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="风险标签" min-width="220">
          <template #default="{ row }">
            <div class="risk-cell">
              <el-tag :type="riskLevelTagType(row.riskLevel)" round>{{ row.riskLevel }}风险</el-tag>
              <el-tag
                v-for="tag in getVisibleRiskTags(row.riskTags)"
                :key="tag"
                effect="plain"
                round
                class="risk-chip"
              >
                {{ tag }}
              </el-tag>
              <el-tag
                v-if="getHiddenRiskTagCount(row.riskTags) > 0"
                effect="plain"
                round
                class="risk-chip risk-chip-muted"
              >
                +{{ getHiddenRiskTagCount(row.riskTags) }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="{ row }">
            <el-button link type="primary" @click="goToDetail(row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-5 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next"
          :total="filteredOrders.length"
          :page-sizes="PAGE_SIZE_OPTIONS"
          @current-change="handlePageChange"
          @size-change="handlePageSizeChange"
        />
      </div>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { useOrderFulfillmentList } from '@/composables/use-order-fulfillment-list'

const {
  queryForm,
  advancedVisible,
  currentPage,
  pageSize,
  PAGE_SIZE_OPTIONS,
  countryOptions,
  orderStatusOptions,
  paymentStatusOptions,
  ownerOptions,
  channelOptions,
  productLineOptions,
  customerLevelOptions,
  tradeTermOptions,
  shippingMethodOptions,
  riskLevelOptions,
  hasActiveFilters,
  filteredOrders,
  paginatedOrders,
  highRiskCount,
  overdueCount,
  sampleCount,
  summaryCards,
  pageStart,
  pageEnd,
  applyFilters,
  resetFilters,
  handlePageChange,
  handlePageSizeChange,
  toggleAdvancedFilters,
  goToDetail,
} = useOrderFulfillmentList()

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

function progressColor(progress: number) {
  if (progress >= 90) {
    return '#34d399'
  }

  if (progress >= 50) {
    return '#fb923c'
  }

  return '#f87171'
}

function getVisibleRiskTags(tags: string[]) {
  return tags.slice(0, 2)
}

function getHiddenRiskTagCount(tags: string[]) {
  return Math.max(tags.length - 2, 0)
}
</script>

<style scoped>
.query-card,
.table-card,
.summary-card {
  border-radius: 28px;
  border: 1px solid rgba(251, 191, 36, 0.18);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 16px 34px rgba(249, 115, 22, 0.08);
}

.result-tag {
  --el-tag-bg-color: rgba(255, 247, 237, 1);
  --el-tag-border-color: rgba(253, 186, 116, 0.28);
  --el-tag-text-color: #c2410c;
}

.risk-chip {
  --el-tag-border-color: rgba(251, 146, 60, 0.24);
  --el-tag-bg-color: rgba(255, 247, 237, 0.9);
  --el-tag-text-color: #9a3412;
}

.risk-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
}

.risk-chip {
  flex-shrink: 0;
}

.risk-chip-muted {
  --el-tag-border-color: rgba(148, 163, 184, 0.22);
  --el-tag-bg-color: rgba(248, 250, 252, 0.96);
  --el-tag-text-color: #64748b;
}
</style>
