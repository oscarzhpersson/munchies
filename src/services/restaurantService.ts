import { transformRestaurantDataApiToDomain } from '@/transformers/restaurantApiToDomainTransformer'
import { fetchWithErrorHandling } from './apiClient'
import { fetchAndTransformFilters } from '@/services/filterService'
import { fetchOpenStatus } from '@/services/openStatusService'
import { fetchPriceRange } from '@/services/priceRangeService'

import type { RestaurantWithDetails, ApiRestaurant, Restaurant } from '@/interfaces/restaurant'
import type { Filter } from '@/interfaces/filter'

/** Base URL for the API endpoints. */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

if (!BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_BASE_URL is not defined.')
}

/**
 * Fetches the list of restaurants from the API.
 * @returns {Promise<ApiRestaurant[]>} - A promise that resolves to an array of ApiRestaurant objects.
 */
async function fetchRestaurants(): Promise<ApiRestaurant[]> {
  const { restaurants } = await fetchWithErrorHandling<{ restaurants: ApiRestaurant[] }>(
    `${BASE_URL}/api/restaurants`,
  )
  return restaurants
}

/**
 * Enriches a restaurant object with additional details like open status, price range, and associated filters.
 * @param {Restaurant} restaurant - The restaurant object to enrich.
 * @param {Map<string, Filter>} filterMap - A map of filters keyed by their IDs.
 * @returns {Promise<RestaurantWithDetails>} - A promise that resolves to the enriched RestaurantWithDetails object.
 */
async function enrichRestaurantDataWithDetails(
  restaurant: Restaurant,
  filterMap: Map<string, Filter>,
): Promise<RestaurantWithDetails> {
  const [openStatusResult, priceRangeResult] = await Promise.all([
    fetchOpenStatus(restaurant.id),
    fetchPriceRange(restaurant.priceRangeId),
  ])

  const openStatus = openStatusResult || { restaurant_id: restaurant.id, is_open: false }
  const priceRange = priceRangeResult || null

  const filters = restaurant.filterIds
    .map((filterId) => filterMap.get(filterId))
    .filter((filter): filter is Filter => filter !== undefined)

  return {
    ...restaurant,
    openStatus,
    priceRange,
    filters,
  }
}

/**
 * Fetches restaurant data, including additional details and associated filters.
 * @returns {Promise<{ restaurantWithDetails: RestaurantWithDetails[]; filters: Filter[] }>}
 * - A promise that resolves to an object containing an array of enriched restaurants and an array of filters.
 * @throws Will throw an error if fetching restaurant data fails.
 */
export const fetchRestaurantData = async (): Promise<{
  restaurantWithDetails: RestaurantWithDetails[]
  filters: Filter[]
}> => {
  try {
    const apiRestaurants = await fetchRestaurants()
    let domainRestaurants = apiRestaurants.map(transformRestaurantDataApiToDomain)

    domainRestaurants = domainRestaurants.map((restaurant) => ({
      ...restaurant,
      imageUrl: `${BASE_URL}${restaurant.imageUrl}`,
    }))

    const allFilterIds = Array.from(
      new Set(domainRestaurants.flatMap((restaurant) => restaurant.filterIds)),
    )

    const filterMap = await fetchAndTransformFilters(allFilterIds)

    const restaurantDetailsPromises = domainRestaurants.map((restaurant) =>
      enrichRestaurantDataWithDetails(restaurant, filterMap),
    )

    const restaurantWithDetails: RestaurantWithDetails[] =
      await Promise.all(restaurantDetailsPromises)

    const sortedRestaurants = restaurantWithDetails.sort((a, b) => {
      return a.openStatus.is_open === b.openStatus.is_open ? 0 : a.openStatus.is_open ? -1 : 1
    })

    return {
      restaurantWithDetails: sortedRestaurants,
      filters: Array.from(filterMap.values()),
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching restaurant data:', error.message)
    } else {
      console.error('An unknown error occurred while fetching restaurant data.')
    }
    throw new Error('Failed to fetch restaurant data')
  }
}
