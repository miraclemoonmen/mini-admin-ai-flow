import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  getOrderFulfillmentFilterOptions,
  getOrderFulfillmentOrders,
} from '@/api/modules/order-fulfillment'
import {
  applyRouteState,
  buildQueryFromState,
  normalizeQuery,
  parseRouteState,
} from '@/composables/order-fulfillment/query-route'
import {
  cloneQueryForm,
  createDefaultQueryForm,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  type QueryForm,
} from '@/composables/order-fulfillment/query-schema'

const orders = getOrderFulfillmentOrders()

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
      applyRouteState(queryForm, state)
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
