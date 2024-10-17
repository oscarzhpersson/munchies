export interface DeliveryRange {
  lower: number
  upper: number
  label: string
}

export interface DeliveryTime {
  ranges: DeliveryRange[] | null
  upperFallback: string
  lowerFallback: string
}
