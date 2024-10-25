import { describe, expect, test, jest } from '@jest/globals'
import { filterRestaurants } from '@/utils/filterHelpers'
import { slugifyFilter } from '@/utils/urlHelpers'

import type { RestaurantWithDetails } from '@/interfaces/api/restaurant'

jest.mock('@/utils/urlHelpers', () => ({
  slugifyFilter: jest.fn((value: string) => value.toLowerCase().replace(/\s+/g, '-')),
}))

describe('filterRestaurants', () => {
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
      filters: [
        { id: '1', name: 'Italian', imageUrl: 'filter1-img' },
        { id: '2', name: 'Pizza', imageUrl: 'filter2-img' },
      ],
      deliveryTimeLabel: '20-30 minutes',
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
      filters: [{ id: '1', name: 'Mexican', imageUrl: 'filter1-img' }],
      deliveryTimeLabel: '30-40 minutes',
    },
    {
      id: '3',
      name: 'Restaurant C',
      rating: 4.1,
      filterIds: ['3'],
      imageUrl: 'url-to-image',
      deliveryTimeInMinutes: 50,
      priceRangeId: '3',
      openStatus: { restaurant_id: '3', is_open: false },
      priceRange: { id: '3', range: '$$$' },
      filters: [{ id: '3', name: 'Sushi', imageUrl: 'filter3-img' }],
      deliveryTimeLabel: '40-50 minutes',
    },
  ]

  test('should filter restaurants by category', () => {
    const categoriesFromUrl = ['Pizza']
    const deliveryTimesFromUrl: string[] = []
    const priceRangesFromUrl: string[] = []

    const result = filterRestaurants(
      mockRestaurants,
      categoriesFromUrl,
      deliveryTimesFromUrl,
      priceRangesFromUrl,
    )

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Restaurant A')
  })

  test('should filter restaurants by delivery time', () => {
    const categoriesFromUrl: string[] = []
    const deliveryTimesFromUrl = ['20-30-minutes']
    const priceRangesFromUrl: string[] = []

    const result = filterRestaurants(
      mockRestaurants,
      categoriesFromUrl,
      deliveryTimesFromUrl,
      priceRangesFromUrl,
    )

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Restaurant A')

    // Verify slugifyFilter was called with the correct label
    expect(slugifyFilter).toHaveBeenCalledWith('20-30 minutes')
  })

  test('should filter restaurants by price range', () => {
    const categoriesFromUrl: string[] = []
    const deliveryTimesFromUrl: string[] = []
    const priceRangesFromUrl = ['$$']

    const result = filterRestaurants(
      mockRestaurants,
      categoriesFromUrl,
      deliveryTimesFromUrl,
      priceRangesFromUrl,
    )

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Restaurant B')

    expect(slugifyFilter).toHaveBeenCalledWith('$$')
  })

  test('should filter restaurants by category, delivery time, and price range', () => {
    const categoriesFromUrl = ['Sushi']
    const deliveryTimesFromUrl = ['40-50-minutes']
    const priceRangesFromUrl = ['$$$']

    const result = filterRestaurants(
      mockRestaurants,
      categoriesFromUrl,
      deliveryTimesFromUrl,
      priceRangesFromUrl,
    )

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Restaurant C')
  })

  test('should return all restaurants when no filters are applied', () => {
    const categoriesFromUrl: string[] = []
    const deliveryTimesFromUrl: string[] = []
    const priceRangesFromUrl: string[] = []

    const result = filterRestaurants(
      mockRestaurants,
      categoriesFromUrl,
      deliveryTimesFromUrl,
      priceRangesFromUrl,
    )

    expect(result).toHaveLength(3)
  })
})
