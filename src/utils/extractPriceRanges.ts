import type { RestaurantWithDetails } from '@/interfaces/api/restaurant'

/**
 * Extracts a sorted list of unique price ranges from an array of restaurants.
 *
 * @param {RestaurantWithDetails[]} restaurantWithDetails - The array of restaurant details.
 * @returns {string[]} A sorted array of unique price range strings.
 */
export function extractPriceRanges(restaurantWithDetails: RestaurantWithDetails[]): string[] {
  const uniquePriceRanges = new Set(
    restaurantWithDetails
      .map((restaurant) => restaurant.priceRange?.range)
      .filter(
        (priceRange): priceRange is string => priceRange !== undefined && priceRange !== null,
      ),
  )

  return Array.from(uniquePriceRanges).sort((a, b) => a.length - b.length)
}
