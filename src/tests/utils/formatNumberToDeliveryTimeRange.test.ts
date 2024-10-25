import { describe, expect, test } from '@jest/globals'
import { formatNumberToDeliveryTimeRange } from '@/utils/formatNumberToDeliveryTimeRange'

import type { DeliveryTime } from '@/interfaces/cms/delivery-time'

describe('formatNumberToDeliveryTimeRange', () => {
  const mockDeliveryTimeRanges: DeliveryTime = {
    lowerFallback: 'Under 10 min',
    upperFallback: 'Over 60 min',
    ranges: [
      { lower: 10, upper: 20, label: '10-20 min' },
      { lower: 21, upper: 30, label: '21-30 min' },
      { lower: 31, upper: 40, label: '31-40 min' },
      { lower: 41, upper: 60, label: '41-60 min' },
    ],
  }

  test('should return lower fallback when number is below the lowest range', () => {
    const result = formatNumberToDeliveryTimeRange(5, mockDeliveryTimeRanges)
    expect(result).toBe('Under 10 min')
  })

  test('should return upper fallback when number is above the highest range', () => {
    const result = formatNumberToDeliveryTimeRange(65, mockDeliveryTimeRanges)
    expect(result).toBe('Over 60 min')
  })

  test('should return the correct range label when the number is within a range', () => {
    const result1 = formatNumberToDeliveryTimeRange(15, mockDeliveryTimeRanges)
    expect(result1).toBe('10-20 min')

    const result2 = formatNumberToDeliveryTimeRange(25, mockDeliveryTimeRanges)
    expect(result2).toBe('21-30 min')

    const result3 = formatNumberToDeliveryTimeRange(35, mockDeliveryTimeRanges)
    expect(result3).toBe('31-40 min')
  })

  test('should return upper fallback when number is exactly above the highest range', () => {
    const result = formatNumberToDeliveryTimeRange(61, mockDeliveryTimeRanges)
    expect(result).toBe('Over 60 min')
  })

  test('should return lower fallback when number is exactly below the lowest range', () => {
    const result = formatNumberToDeliveryTimeRange(9, mockDeliveryTimeRanges)
    expect(result).toBe('Under 10 min')
  })

  test('should return upper fallback when no ranges are provided', () => {
    const result = formatNumberToDeliveryTimeRange(25, null)
    expect(result).toBeUndefined()

    const resultWithFallback = formatNumberToDeliveryTimeRange(25, {
      lowerFallback: 'Under 10 min',
      upperFallback: 'Over 60 min',
      ranges: null,
    })
    expect(resultWithFallback).toBe('Over 60 min')
  })

  test('should handle edge cases correctly', () => {
    const result = formatNumberToDeliveryTimeRange(20, mockDeliveryTimeRanges)
    expect(result).toBe('10-20 min') // Edge case where the number is the upper limit of a range
  })
})
