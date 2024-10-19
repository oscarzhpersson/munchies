import type { RestaurantWithDetails } from '@/interfaces/restaurant'

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
