import type { DeliveryTime } from '@/interfaces/cms/delivery-time'

export const defaultDeliveryTimeRanges: DeliveryTime = {
  ranges: [
    {
      lower: 0,
      upper: 30,
      label: '0-30 min',
    },
    {
      lower: 31,
      upper: 60,
      label: '30-60 min',
    },
  ],
  upperFallback: '1 hour+',
  lowerFallback: 'Instant',
}
