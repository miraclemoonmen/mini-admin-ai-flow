import orderDetailResponse from '@/mock/order-fulfillment-detail.json'
import rawOrders from '@/mock/order-fulfillment.json'
import type { MockResponse } from '@/types'

export type OrderItem = (typeof rawOrders)[number]

export interface OrderOverview {
  priorityLevel: string
  buyerTier: string
  regionManager: string
  orderAgingDays: number
  expectedGrossMargin: number
  deliveryPressure: string
  latestException: string
  nextAction: string
}

export interface MilestoneItem {
  stage: string
  status: string
  owner: string
  actualDate: string
  targetDate: string
  note: string
}

export interface ProductItem {
  sku: string
  productName: string
  specification: string
  material: string
  quantity: number
  unitPrice: number
  cartons: number
  volume: number
}

export interface PaymentSummary {
  depositRatio: number
  depositAmount: number
  balanceAmount: number
  settlementMethod: string
  dutyMode: string
  financeRisk: string
}

export interface PaymentItem {
  node: string
  amount: number
  dueDate: string
  receivedDate: string
  status: string
}

export interface FeeItem {
  label: string
  amount: number
}

export interface LogisticsInfo {
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

export interface DocumentItem {
  name: string
  status: string
  owner: string
  note: string
}

export interface FollowUpItem {
  time: string
  owner: string
  channel: string
  summary: string
  nextStep: string
}

export interface OrderDetailRecord {
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

const detailPayload = orderDetailResponse as MockResponse<OrderDetailRecord[]>

export function getOrderFulfillmentOrders() {
  return rawOrders
}

export function getOrderFulfillmentOrderById(id: number) {
  return rawOrders.find((item) => item.id === id)
}

export function getOrderFulfillmentDetailById(id: number) {
  if (detailPayload.code !== 0) {
    return undefined
  }

  return detailPayload.data.find((item) => item.id === id)
}

export function getOrderFulfillmentFilterOptions<K extends keyof OrderItem>(key: K) {
  return [...new Set(rawOrders.map((item) => item[key]))].sort()
}
