import type { LocationQuery, LocationQueryRaw } from 'vue-router'

import {
  cloneQueryForm,
  createDefaultQueryForm,
  DEFAULT_AMOUNT_RANGE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  getQueryCode,
  getQueryLabel,
  PAGE_SIZE_OPTIONS,
  type QueryForm,
} from './query-schema'

export interface OrderFulfillmentRouteState {
  form: QueryForm
  page: number
  pageSize: number
  advancedVisible: boolean
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

export function parseRouteState(query: LocationQuery): OrderFulfillmentRouteState {
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

export function buildQueryFromState(
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

export function normalizeQuery(query: LocationQuery | LocationQueryRaw) {
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

export function applyRouteState(target: QueryForm, state: OrderFulfillmentRouteState) {
  Object.assign(target, cloneQueryForm(state.form))
}
