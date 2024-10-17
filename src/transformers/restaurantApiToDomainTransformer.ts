import type { ApiRestaurant, Restaurant } from '@/interfaces/restaurant'

export function transformRestaurantDataApiToDomain(apiResponse: ApiRestaurant): Restaurant {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    rating: apiResponse.rating,
    filterIds: apiResponse.filter_ids,
    imageUrl: apiResponse.image_url,
    deliveryTimeInMinutes: apiResponse.delivery_time_in_minutes,
    priceRangeId: apiResponse.price_range_id,
  }
}
