import { describe, expect, test } from '@jest/globals'
import { transformRestaurantDataApiToDomain } from '@/transformers/restaurantApiToDomainTransformer'

import type { ApiRestaurant, Restaurant } from '@/interfaces/api/restaurant'

describe('transformRestaurantDataApiToDomain', () => {
  test('should transform ApiRestaurant data to Restaurant model correctly', () => {
    // Arrange
    const apiRestaurant: ApiRestaurant = {
      id: '123',
      name: 'Sample Restaurant',
      rating: 4.5,
      filter_ids: ['filter1', 'filter2'],
      image_url: 'https://example.com/image.jpg',
      delivery_time_minutes: 30,
      price_range_id: 'price1',
    }

    const expectedRestaurant: Restaurant = {
      id: '123',
      name: 'Sample Restaurant',
      rating: 4.5,
      filterIds: ['filter1', 'filter2'],
      imageUrl: 'https://example.com/image.jpg',
      deliveryTimeInMinutes: 30,
      priceRangeId: 'price1',
    }

    // Act
    const result = transformRestaurantDataApiToDomain(apiRestaurant)

    // Assert
    expect(result).toEqual(expectedRestaurant)
  })
})
