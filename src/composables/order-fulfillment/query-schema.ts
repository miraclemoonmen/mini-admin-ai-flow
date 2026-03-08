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

export const DEFAULT_AMOUNT_RANGE: [number, number] = [0, 200000]
export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

export const QUERY_VALUE_MAP = {
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

export type QueryValueMapKey = keyof typeof QUERY_VALUE_MAP

export function createDefaultQueryForm(): QueryForm {
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

export function getQueryLabel<K extends QueryValueMapKey>(key: K, code: string) {
  const entries = Object.entries(QUERY_VALUE_MAP[key]) as Array<[string, string]>
  const match = entries.find(([, value]) => value === code)

  return match?.[0] ?? ''
}

export function getQueryCode<K extends QueryValueMapKey>(key: K, label: string) {
  return QUERY_VALUE_MAP[key][label as keyof (typeof QUERY_VALUE_MAP)[K]] ?? ''
}

export function cloneQueryForm(form: QueryForm): QueryForm {
  return {
    ...form,
    orderDateRange: [...form.orderDateRange],
    amountRange: [...form.amountRange] as [number, number],
  }
}
