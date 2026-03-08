import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter, type LocationQuery, type LocationQueryRaw } from 'vue-router'

import {
  getOrderFulfillmentFilterOptions,
  getOrderFulfillmentOrders,
} from '@/api/modules/order-fulfillment'

export interface QueryForm {
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

const orders = getOrderFulfillmentOrders()

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

function formatAmount(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function useOrderFulfillmentList() {
  const route = useRoute()
  const router = useRouter()
  const initialRouteState = parseRouteState(route.query)
  const queryForm = reactive(cloneQueryForm(initialRouteState.form))
  const appliedQuery = ref<QueryForm>(cloneQueryForm(initialRouteState.form))
  const advancedVisible = ref(initialRouteState.advancedVisible)
  const currentPage = ref(initialRouteState.page)
  const pageSize = ref(initialRouteState.pageSize)
  const isHydratingFromRoute = ref(false)

  const countryOptions = getOrderFulfillmentFilterOptions('country')
  const orderStatusOptions = getOrderFulfillmentFilterOptions('orderStatus')
  const paymentStatusOptions = getOrderFulfillmentFilterOptions('paymentStatus')
  const ownerOptions = getOrderFulfillmentFilterOptions('owner')
  const channelOptions = getOrderFulfillmentFilterOptions('channel')
  const productLineOptions = getOrderFulfillmentFilterOptions('productLine')
  const customerLevelOptions = getOrderFulfillmentFilterOptions('customerLevel')
  const tradeTermOptions = getOrderFulfillmentFilterOptions('tradeTerm')
  const shippingMethodOptions = getOrderFulfillmentFilterOptions('shippingMethod')
  const riskLevelOptions = getOrderFulfillmentFilterOptions('riskLevel')

  const hasActiveFilters = computed(
    () => JSON.stringify(appliedQuery.value) !== JSON.stringify(createDefaultQueryForm()),
  )

  const filteredOrders = computed(() => {
    const filters = appliedQuery.value
    const [minAmount, maxAmount] = filters.amountRange
    const [startDate, endDate] = filters.orderDateRange
    const keyword = filters.keyword.trim().toLowerCase()

    return orders.filter((item) => {
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

  watch(filteredOrders, (filteredItems) => {
    const maxPage = Math.max(1, Math.ceil(filteredItems.length / pageSize.value))

    if (currentPage.value > maxPage) {
      currentPage.value = maxPage

      if (!isHydratingFromRoute.value) {
        void syncRouteQuery('replace')
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

  return {
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
  }
}
