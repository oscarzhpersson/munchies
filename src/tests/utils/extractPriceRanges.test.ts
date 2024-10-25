import { describe, expect, test } from '@jest/globals'
import { extractPriceRanges } from '@/utils/extractPriceRanges'

import type { RestaurantWithDetails } from '@/interfaces/api/restaurant'

describe('extractPriceRanges', () => {
  const mockRestaurants: RestaurantWithDetails[] = [
    {
      id: '1',
      name: 'Restaurant A',
      rating: 4.5,
      filterIds: ['1', '2'],
      imageUrl: 'url-to-image',
      deliveryTimeInMinutes: 30,
      priceRangeId: '1',
      openStatus: { restaurant_id: '1', is_open: true },
      priceRange: { id: '1', range: '$' },
      filters: [{ id: '1', name: 'Filter 1', imageUrl: 'filter1-img' }],
    },
    {
      id: '2',
      name: 'Restaurant B',
      rating: 4.2,
      filterIds: ['1'],
      imageUrl: 'url-to-image',
      deliveryTimeInMinutes: 40,
      priceRangeId: '2',
      openStatus: { restaurant_id: '2', is_open: true },
      priceRange: { id: '2', range: '$$' },
      filters: [{ id: '1', name: 'Filter 1', imageUrl: 'filter1-img' }],
    },
    {
      id: '3',
      name: 'Restaurant C',
      rating: 3.9,
      filterIds: ['2'],
      imageUrl: 'url-to-image',
      deliveryTimeInMinutes: 50,
      priceRangeId: '3',
      openStatus: { restaurant_id: '3', is_open: false },
      priceRange: { id: '3', range: '$$$' },
      filters: [{ id: '2', name: 'Filter 2', imageUrl: 'filter2-img' }],
    },
    {
      id: '4',
      name: 'Restaurant D',
      rating: 4.0,
      filterIds: ['1', '3'],
      imageUrl: 'url-to-image',
      deliveryTimeInMinutes: 25,
      priceRangeId: '2',
      openStatus: { restaurant_id: '4', is_open: true },
      priceRange: { id: '2', range: '$$' }, // Duplicate price range
      filters: [{ id: '1', name: 'Filter 1', imageUrl: 'filter1-img' }],
    },
    {
      id: '5',
      name: 'Restaurant E',
      rating: 4.8,
      filterIds: ['2'],
      imageUrl: 'url-to-image',
      deliveryTimeInMinutes: 60,
      priceRangeId: '4',
      openStatus: { restaurant_id: '5', is_open: true },
      priceRange: { id: '4', range: '$$$$' },
      filters: [{ id: '2', name: 'Filter 2', imageUrl: 'filter2-img' }],
    },
    {
      id: '6',
      name: 'Restaurant F',
      rating: 4.1,
      filterIds: ['1'],
      imageUrl: 'url-to-image',
      deliveryTimeInMinutes: 20,
      priceRangeId: '5',
      openStatus: { restaurant_id: '6', is_open: false },
      priceRange: null, // No price range
      filters: [{ id: '1', name: 'Filter 1', imageUrl: 'filter1-img' }],
    },
  ]

  test('should return a sorted list of unique price ranges', () => {
    const result = extractPriceRanges(mockRestaurants)
    expect(result).toEqual(['$', '$$', '$$$', '$$$$']) // Sorted by length
  })

  test('should return an empty array when no price ranges are provided', () => {
    const result = extractPriceRanges([])
    expect(result).toEqual([])
  })

  test('should handle undefined or null price ranges gracefully', () => {
    const restaurantsWithInvalidPriceRanges: RestaurantWithDetails[] = [
      {
        id: '1',
        name: 'Restaurant A',
        rating: 4.5,
        filterIds: ['1'],
        imageUrl: 'url-to-image',
        deliveryTimeInMinutes: 30,
        priceRangeId: '1',
        openStatus: { restaurant_id: '1', is_open: true },
        priceRange: null,
        filters: [{ id: '1', name: 'Filter 1', imageUrl: 'filter1-img' }],
      },
      {
        id: '2',
        name: 'Restaurant B',
        rating: 4.0,
        filterIds: ['2'],
        imageUrl: 'url-to-image',
        deliveryTimeInMinutes: 40,
        priceRangeId: '2',
        openStatus: { restaurant_id: '2', is_open: false },
        priceRange: null,
        filters: [{ id: '2', name: 'Filter 2', imageUrl: 'filter2-img' }],
      },
    ]
    const result = extractPriceRanges(restaurantsWithInvalidPriceRanges)
    expect(result).toEqual([]) // No valid price ranges, so it should return an empty array
  })
})
