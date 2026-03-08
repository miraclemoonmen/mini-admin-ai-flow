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
                    {{ formatAmount(queryForm.amountRange[0]) }} - {{ formatAmount(queryForm.amountRange[1]) }}
                  </span>
                </div>
                <el-slider
                  v-model="queryForm.amountRange"
                  range
                  :min="DEFAULT_AMOUNT_RANGE[0]"
                  :max="DEFAULT_AMOUNT_RANGE[1]"
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
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter, type LocationQuery, type LocationQueryRaw } from 'vue-router'

import rawOrders from '@/mock/order-fulfillment.json'

type OrderItem = (typeof rawOrders)[number]

interface QueryForm {
  keyword: string
  country: string
  orderStatus: string
  paymentStatus: string
  orderDateRange: string[]
  owner: string
  channel: string
  productLine: string
  customerLevel: string
  tradeTerm: string
  shippingMethod: string
  riskLevel: string
  overdueOnly?: boolean
  sampleOnly?: boolean
  amountRange: [number, number]
}

const DEFAULT_AMOUNT_RANGE: [number, number] = [0, 200000]
const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]
const QUERY_VALUE_MAP = {
  country: {
    美国: 'us',
    德国: 'de',
    波兰: 'pl',
    英国: 'uk',
    加拿大: 'ca',
    法国: 'fr',
    澳大利亚: 'au',
    瑞典: 'se',
    荷兰: 'nl',
    日本: 'jp',
    西班牙: 'es',
    意大利: 'it',
  },
  orderStatus: {
    待确认: 'pending',
    打样中: 'sampling',
    生产中: 'production',
    验货中: 'inspection',
    待出运: 'shipping-ready',
    已出运: 'shipped',
  },
  paymentStatus: {
    待支付定金: 'deposit-pending',
    已付定金: 'deposit-paid',
    尾款待付: 'balance-pending',
    已完成付款: 'paid',
  },
  owner: {
    Mia: 'mia',
    Leo: 'leo',
    Ava: 'ava',
    Noah: 'noah',
    Iris: 'iris',
  },
  channel: {
    'Alibaba 国际站': 'alibaba',
    独立站: 'site',
    邮件直客: 'email',
    展会线索: 'expo',
  },
  productLine: {
    客厅家具: 'living-room',
    藤编收纳: 'rattan-storage',
    卧室软装: 'bedroom-decor',
    餐厨家居: 'dining-kitchen',
    户外家具: 'outdoor',
  },
  customerLevel: {
    战略客户: 'strategic',
    A类: 'a',
    B类: 'b',
    新客: 'new',
  },
  tradeTerm: {
    FOB: 'fob',
    CIF: 'cif',
    DDP: 'ddp',
    EXW: 'exw',
  },
  shippingMethod: {
    海运整柜: 'fcl',
    海运拼箱: 'lcl',
    铁路: 'rail',
    空运: 'air',
  },
  riskLevel: {
    低: 'low',
    中: 'medium',
    高: 'high',
  },
} as const

type QueryValueMapKey = keyof typeof QUERY_VALUE_MAP

function createDefaultQueryForm(): QueryForm {
  return {
    keyword: '',
    country: '',
    orderStatus: '',
    paymentStatus: '',
    orderDateRange: [],
    owner: '',
    channel: '',
    productLine: '',
    customerLevel: '',
    tradeTerm: '',
    shippingMethod: '',
    riskLevel: '',
    overdueOnly: undefined,
    sampleOnly: undefined,
    amountRange: [...DEFAULT_AMOUNT_RANGE],
  }
}

function getQueryStringValue(query: LocationQuery, key: string) {
  const value = query[key]

  if (Array.isArray(value)) {
    return value[0] ?? ''
  }

  return value ?? ''
}

function parseBooleanQuery(value: string) {
  if (value === '1') {
    return true
  }

  if (value === '0') {
    return false
  }

  return undefined
}

function parseNumberQuery(value: string, fallback: number) {
  const parsed = Number.parseInt(value, 10)

  return Number.isFinite(parsed) ? parsed : fallback
}

function normalizePageSize(value: number) {
  return PAGE_SIZE_OPTIONS.includes(value) ? value : DEFAULT_PAGE_SIZE
}

function getQueryLabel<K extends QueryValueMapKey>(key: K, code: string) {
  const entries = Object.entries(QUERY_VALUE_MAP[key]) as Array<[string, string]>
  const match = entries.find(([, value]) => value === code)

  return match?.[0] ?? ''
}

function getQueryCode<K extends QueryValueMapKey>(key: K, label: string) {
  return QUERY_VALUE_MAP[key][label as keyof (typeof QUERY_VALUE_MAP)[K]] ?? ''
}

function cloneQueryForm(form: QueryForm): QueryForm {
  return {
    ...form,
    orderDateRange: [...form.orderDateRange],
    amountRange: [...form.amountRange] as [number, number],
  }
}

function uniqueOptions<K extends keyof OrderItem>(key: K) {
  return [...new Set(rawOrders.map((item) => item[key]))].sort()
}

function parseRouteState(query: LocationQuery) {
  const defaults = createDefaultQueryForm()
  const startDate = getQueryStringValue(query, 'startDate')
  const endDate = getQueryStringValue(query, 'endDate')
  const amountMin = parseNumberQuery(getQueryStringValue(query, 'amountMin'), DEFAULT_AMOUNT_RANGE[0])
  const amountMax = parseNumberQuery(getQueryStringValue(query, 'amountMax'), DEFAULT_AMOUNT_RANGE[1])
  const page = Math.max(parseNumberQuery(getQueryStringValue(query, 'page'), DEFAULT_PAGE), DEFAULT_PAGE)
  const pageSize = normalizePageSize(
    parseNumberQuery(getQueryStringValue(query, 'pageSize'), DEFAULT_PAGE_SIZE),
  )

  return {
    form: {
      ...defaults,
      keyword: getQueryStringValue(query, 'keyword'),
      country: getQueryLabel('country', getQueryStringValue(query, 'country')),
      orderStatus: getQueryLabel('orderStatus', getQueryStringValue(query, 'orderStatus')),
      paymentStatus: getQueryLabel('paymentStatus', getQueryStringValue(query, 'paymentStatus')),
      orderDateRange: startDate && endDate ? [startDate, endDate] : [],
      owner: getQueryLabel('owner', getQueryStringValue(query, 'owner')),
      channel: getQueryLabel('channel', getQueryStringValue(query, 'channel')),
      productLine: getQueryLabel('productLine', getQueryStringValue(query, 'productLine')),
      customerLevel: getQueryLabel('customerLevel', getQueryStringValue(query, 'customerLevel')),
      tradeTerm: getQueryLabel('tradeTerm', getQueryStringValue(query, 'tradeTerm')),
      shippingMethod: getQueryLabel('shippingMethod', getQueryStringValue(query, 'shippingMethod')),
      riskLevel: getQueryLabel('riskLevel', getQueryStringValue(query, 'riskLevel')),
      overdueOnly: parseBooleanQuery(getQueryStringValue(query, 'overdueOnly')),
      sampleOnly: parseBooleanQuery(getQueryStringValue(query, 'sampleOnly')),
      amountRange: [
        Math.max(amountMin, DEFAULT_AMOUNT_RANGE[0]),
        Math.min(Math.max(amountMax, amountMin), DEFAULT_AMOUNT_RANGE[1]),
      ] as [number, number],
    },
    page,
    pageSize,
    advancedVisible: getQueryStringValue(query, 'advanced') !== '0',
  }
}

function buildQueryFromState(
  form: QueryForm,
  page: number,
  pageSize: number,
  isAdvancedVisible: boolean,
): LocationQueryRaw {
  const query: LocationQueryRaw = {}

  if (form.keyword.trim()) query.keyword = form.keyword.trim()
  if (form.country) query.country = getQueryCode('country', form.country)
  if (form.orderStatus) query.orderStatus = getQueryCode('orderStatus', form.orderStatus)
  if (form.paymentStatus) query.paymentStatus = getQueryCode('paymentStatus', form.paymentStatus)
  if (form.orderDateRange.length === 2) {
    query.startDate = form.orderDateRange[0]
    query.endDate = form.orderDateRange[1]
  }
  if (form.owner) query.owner = getQueryCode('owner', form.owner)
  if (form.channel) query.channel = getQueryCode('channel', form.channel)
  if (form.productLine) query.productLine = getQueryCode('productLine', form.productLine)
  if (form.customerLevel) query.customerLevel = getQueryCode('customerLevel', form.customerLevel)
  if (form.tradeTerm) query.tradeTerm = getQueryCode('tradeTerm', form.tradeTerm)
  if (form.shippingMethod) query.shippingMethod = getQueryCode('shippingMethod', form.shippingMethod)
  if (form.riskLevel) query.riskLevel = getQueryCode('riskLevel', form.riskLevel)
  if (form.overdueOnly !== undefined) query.overdueOnly = form.overdueOnly ? '1' : '0'
  if (form.sampleOnly !== undefined) query.sampleOnly = form.sampleOnly ? '1' : '0'
  if (form.amountRange[0] !== DEFAULT_AMOUNT_RANGE[0]) query.amountMin = `${form.amountRange[0]}`
  if (form.amountRange[1] !== DEFAULT_AMOUNT_RANGE[1]) query.amountMax = `${form.amountRange[1]}`
  if (page > DEFAULT_PAGE) query.page = `${page}`
  if (pageSize !== DEFAULT_PAGE_SIZE) query.pageSize = `${pageSize}`
  if (!isAdvancedVisible) query.advanced = '0'

  return query
}

function normalizeQuery(query: LocationQuery | LocationQueryRaw) {
  const normalized: Record<string, string> = {}

  for (const key of Object.keys(query).sort()) {
    const value = query[key]

    if (value === undefined || value === '') {
      continue
    }

    normalized[key] = Array.isArray(value) ? value.join(',') : `${value}`
  }

  return JSON.stringify(normalized)
}

const route = useRoute()
const router = useRouter()
const initialRouteState = parseRouteState(route.query)
const queryForm = reactive(cloneQueryForm(initialRouteState.form))
const appliedQuery = ref<QueryForm>(cloneQueryForm(initialRouteState.form))
const advancedVisible = ref(initialRouteState.advancedVisible)
const currentPage = ref(initialRouteState.page)
const pageSize = ref(initialRouteState.pageSize)
const isHydratingFromRoute = ref(false)

const countryOptions = uniqueOptions('country')
const orderStatusOptions = uniqueOptions('orderStatus')
const paymentStatusOptions = uniqueOptions('paymentStatus')
const ownerOptions = uniqueOptions('owner')
const channelOptions = uniqueOptions('channel')
const productLineOptions = uniqueOptions('productLine')
const customerLevelOptions = uniqueOptions('customerLevel')
const tradeTermOptions = uniqueOptions('tradeTerm')
const shippingMethodOptions = uniqueOptions('shippingMethod')
const riskLevelOptions = uniqueOptions('riskLevel')

const hasActiveFilters = computed(
  () => JSON.stringify(appliedQuery.value) !== JSON.stringify(createDefaultQueryForm()),
)

const filteredOrders = computed(() => {
  const filters = appliedQuery.value
  const [minAmount, maxAmount] = filters.amountRange
  const [startDate, endDate] = filters.orderDateRange
  const keyword = filters.keyword.trim().toLowerCase()

  return rawOrders.filter((item) => {
    const keywordMatch =
      keyword.length === 0 ||
      [item.orderNo, item.customerName, item.companyName].some((field) =>
        field.toLowerCase().includes(keyword),
      )

    const baseMatch =
      keywordMatch &&
      (!filters.country || item.country === filters.country) &&
      (!filters.orderStatus || item.orderStatus === filters.orderStatus) &&
      (!filters.paymentStatus || item.paymentStatus === filters.paymentStatus) &&
      (!filters.owner || item.owner === filters.owner) &&
      (!filters.channel || item.channel === filters.channel) &&
      (!filters.productLine || item.productLine === filters.productLine) &&
      (!filters.customerLevel || item.customerLevel === filters.customerLevel) &&
      (!filters.tradeTerm || item.tradeTerm === filters.tradeTerm) &&
      (!filters.shippingMethod || item.shippingMethod === filters.shippingMethod) &&
      (!filters.riskLevel || item.riskLevel === filters.riskLevel)

    const dateMatch =
      !startDate || !endDate || (item.orderDate >= startDate && item.orderDate <= endDate)

    const statusMatch =
      (filters.overdueOnly === undefined || item.isOverdue === filters.overdueOnly) &&
      (filters.sampleOnly === undefined || item.isSampleOrder === filters.sampleOnly)

    const amountMatch = item.orderAmount >= minAmount && item.orderAmount <= maxAmount

    return baseMatch && dateMatch && statusMatch && amountMatch
  })
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredOrders.value.slice(start, start + pageSize.value)
})

const highRiskCount = computed(
  () => filteredOrders.value.filter((item) => item.riskLevel === '高').length,
)
const overdueCount = computed(() => filteredOrders.value.filter((item) => item.isOverdue).length)
const sampleCount = computed(
  () => filteredOrders.value.filter((item) => item.isSampleOrder).length,
)

const summaryCards = computed(() => {
  const totalAmount = filteredOrders.value.reduce((sum, item) => sum + item.orderAmount, 0)
  const averageProgress =
    filteredOrders.value.length === 0
      ? 0
      : Math.round(
          filteredOrders.value.reduce((sum, item) => sum + item.productionProgress, 0) /
            filteredOrders.value.length,
        )

  return [
    {
      label: '筛选结果订单数',
      value: `${filteredOrders.value.length}`,
      caption: `当前页显示 ${paginatedOrders.value.length} 笔`,
      trendClass: 'text-slate-500',
    },
    {
      label: '结果总金额',
      value: formatAmount(totalAmount),
      caption: '按当前组合条件汇总',
      trendClass: 'text-emerald-600',
    },
    {
      label: '平均生产进度',
      value: `${averageProgress}%`,
      caption: '用于判断当前履约推进节奏',
      trendClass: 'text-orange-500',
    },
    {
      label: '高风险 / 超期',
      value: `${highRiskCount.value} / ${overdueCount.value}`,
      caption: '优先排查需人工介入订单',
      trendClass: 'text-rose-500',
    },
  ]
})

const pageStart = computed(() => {
  if (filteredOrders.value.length === 0) {
    return 0
  }

  return (currentPage.value - 1) * pageSize.value + 1
})

const pageEnd = computed(() =>
  Math.min(currentPage.value * pageSize.value, filteredOrders.value.length),
)

watch(filteredOrders, (orders) => {
  const maxPage = Math.max(1, Math.ceil(orders.length / pageSize.value))

  if (currentPage.value > maxPage) {
    currentPage.value = maxPage

    if (!isHydratingFromRoute.value) {
      syncRouteQuery('replace')
    }
  }
})

watch(
  () => route.query,
  (query) => {
    const state = parseRouteState(query)

    isHydratingFromRoute.value = true
    Object.assign(queryForm, cloneQueryForm(state.form))
    appliedQuery.value = cloneQueryForm(state.form)
    currentPage.value = state.page
    pageSize.value = state.pageSize
    advancedVisible.value = state.advancedVisible
    isHydratingFromRoute.value = false
  },
)

async function syncRouteQuery(mode: 'push' | 'replace' = 'push') {
  const nextQuery = buildQueryFromState(
    appliedQuery.value,
    currentPage.value,
    pageSize.value,
    advancedVisible.value,
  )

  if (normalizeQuery(nextQuery) === normalizeQuery(route.query)) {
    return
  }

  await router[mode]({
    path: route.path,
    query: nextQuery,
  })
}

function applyFilters() {
  appliedQuery.value = cloneQueryForm(queryForm)
  currentPage.value = 1
  void syncRouteQuery()
}

function resetFilters() {
  const defaults = createDefaultQueryForm()
  Object.assign(queryForm, defaults)
  appliedQuery.value = cloneQueryForm(defaults)
  currentPage.value = DEFAULT_PAGE
  advancedVisible.value = true
  void syncRouteQuery()
}

function handlePageChange(page: number) {
  currentPage.value = page

  if (!isHydratingFromRoute.value) {
    void syncRouteQuery()
  }
}

function handlePageSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = DEFAULT_PAGE

  if (!isHydratingFromRoute.value) {
    void syncRouteQuery()
  }
}

function toggleAdvancedFilters() {
  advancedVisible.value = !advancedVisible.value

  if (!isHydratingFromRoute.value) {
    void syncRouteQuery()
  }
}

function goToDetail(id: number) {
  void router.push({
    name: 'OrderFulfillmentDetail',
    params: {
      id,
    },
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
