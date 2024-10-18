import type { DeliveryTime } from '@/interfaces/delivery-time'

export const formatNumberToDeliveryTimeRange = (num: number, ranges: DeliveryTime | null) => {
  if (!ranges?.ranges) {
    return ranges?.upperFallback
  }

  if (num < ranges.ranges[0].lower) {
    return ranges.lowerFallback
  }

  if (num > ranges.ranges[ranges.ranges.length - 1].upper) {
    return ranges.upperFallback
  }

  let left = 0
  let right = ranges.ranges.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const currentRange = ranges.ranges[mid]

    if (num >= currentRange.lower && num <= currentRange.upper) {
      return currentRange.label
    } else if (num < currentRange.lower) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return ranges.upperFallback
}