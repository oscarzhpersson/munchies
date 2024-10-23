import { slugifyFilter } from '@/utils/urlHelpers'
import type { RestaurantWithDetails } from '@/interfaces/restaurant'

/**
 * Filters restaurants based on categories, delivery times, and price ranges.
 *
 * @param {RestaurantWithDetails[]} restaurants - The list of restaurants to filter.
 * @param {string[]} categoriesFromUrl - The list of category filters from the URL.
 * @param {string[]} deliveryTimesFromUrl - The list of delivery time filters from the URL.
 * @param {string[]} priceRangesFromUrl - The list of price range filters from the URL.
 * @returns {RestaurantWithDetails[]} - The filtered list of restaurants.
 */
export const filterRestaurants = (
  restaurants: RestaurantWithDetails[],
  categoriesFromUrl: string[],
  deliveryTimesFromUrl: string[],
  priceRangesFromUrl: string[],
): RestaurantWithDetails[] => {
  const priceRangesSet = new Set(priceRangesFromUrl)

  return restaurants.filter((restaurant) => {
    const categoryMatch =
      categoriesFromUrl.length > 0
        ? categoriesFromUrl.some((filterName) =>
            restaurant.filters.some(
              (filter) => filter.name.toLowerCase() === filterName.toLowerCase(),
            ),
          )
        : true

    const deliveryTimeMatch =
      deliveryTimesFromUrl.length > 0 && restaurant.deliveryTimeLabel
        ? deliveryTimesFromUrl.includes(slugifyFilter(restaurant.deliveryTimeLabel))
        : true

    const priceRangeMatch =
      priceRangesSet.size > 0 && restaurant.priceRange?.range
        ? priceRangesSet.has(slugifyFilter(restaurant.priceRange.range))
        : true

    return categoryMatch && deliveryTimeMatch && priceRangeMatch
  })
}
