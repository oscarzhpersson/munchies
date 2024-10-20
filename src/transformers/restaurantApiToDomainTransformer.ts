import type { ApiRestaurant, Restaurant } from '@/interfaces/restaurant'

/**
 * Transforms API restaurant data into the domain restaurant model.
 *
 * @param {ApiRestaurant} apiResponse - The API restaurant data received from the backend.
 * @returns {Restaurant} The transformed restaurant object suitable for frontend use.
 */
export function transformRestaurantDataApiToDomain(apiResponse: ApiRestaurant): Restaurant {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    rating: apiResponse.rating,
    filterIds: apiResponse.filter_ids,
    imageUrl: apiResponse.image_url,
    deliveryTimeInMinutes: apiResponse.delivery_time_minutes,
    priceRangeId: apiResponse.price_range_id,
  }
}
