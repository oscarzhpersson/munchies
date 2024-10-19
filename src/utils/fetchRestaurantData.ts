import { transformRestaurantDataApiToDomain } from '@/transformers/restaurantApiToDomainTransformer'
import { transformFilterDataApiToDomain } from '@/transformers/filterApiToDomainTransformer'

import type { RestaurantWithDetails, ApiRestaurant, Restaurant } from '@/interfaces/restaurant'
import type { OpenStatus } from '@/interfaces/open-status'
import type { PriceRange } from '@/interfaces/price-range'
import type { ApiError } from '@/interfaces/api-error'
import type { ApiFilter, Filter } from '@/interfaces/filter'

/** Base URL for the API endpoints. */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

/** Cache for storing fetched filters to avoid redundant API calls. */
const filterCache = new Map<string, Filter>()

if (!BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_BASE_URL is not defined.')
}

/**
 * Fetches data from the given URL with error handling.
 * @template T - The expected type of the response data.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<T>} - A promise that resolves to the fetched data of type T.
 * @throws Will throw an error if the network response is not ok or if the data contains an error.
 */
async function fetchWithErrorHandling<T extends Object>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`)
  }

  const data: T | ApiError = await response.json()

  if ('error' in data && data.error) {
    throw new Error(data.reason || 'Unknown error')
  }

  return data as T
}

/**
 * Fetches a filter by its ID, utilizing a cache to minimize API calls.
 * @param {string} filterId - The ID of the filter to fetch.
 * @returns {Promise<Filter>} - A promise that resolves to the Filter object or null if an error occurs.
 * @throws Will throw an error if the network response is not ok or if the data contains an error.
 */
async function fetchFilter(filterId: string): Promise<Filter> {
  if (filterCache.has(filterId)) {
    return filterCache.get(filterId) as Filter
  }
  try {
    const apiFilter = await fetchWithErrorHandling<ApiFilter>(`${BASE_URL}/api/filter/${filterId}`)
    const filter = transformFilterDataApiToDomain(apiFilter)
    filterCache.set(filterId, filter)
    return filter
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`Error fetching filter ${filterId}: ${errorMessage}`)
    throw new Error('Failed to fetch filter')
  }
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
 * Fetches the open status of a restaurant by its ID.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<OpenStatus>} - A promise that resolves to the OpenStatus object or null if an error occurs.
 * * @throws Will throw an error if the network response is not ok or if the data contains an error.
 */
async function fetchOpenStatus(restaurantId: string): Promise<OpenStatus> {
  try {
    return await fetchWithErrorHandling<OpenStatus>(`${BASE_URL}/api/open/${restaurantId}`)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`Error fetching open status for restaurant ${restaurantId}: ${errorMessage}`)
    throw new Error('Failed to fetch open status')
  }
}

/**
 * Fetches the price range information by its ID.
 * @param {string} priceRangeId - The ID of the price range.
 * @returns {Promise<PriceRange | null>} - A promise that resolves to the PriceRange object or null if an error occurs.
 * @throws Will throw an error if the network response is not ok or if the data contains an error.
 */
async function fetchPriceRange(priceRangeId: string): Promise<PriceRange | null> {
  try {
    return await fetchWithErrorHandling<PriceRange>(`${BASE_URL}/api/price-range/${priceRangeId}`)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`Error fetching price range for price range ${priceRangeId}: ${errorMessage}`)
    throw new Error('Failed to fetch price range')
  }
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
 * Fetches and transforms filters based on an array of filter IDs.
 * @param {string[]} filterIds - An array of filter IDs to fetch.
 * @returns {Promise<Map<string, Filter>>} - A promise that resolves to a map of Filter objects keyed by their IDs.
 */
async function fetchAndTransformFilters(filterIds: string[]): Promise<Map<string, Filter>> {
  const fetchFilterPromises = filterIds.map((filterId) => fetchFilter(filterId))
  const filters = (await Promise.all(fetchFilterPromises)).filter(
    (filter): filter is Filter => filter !== null,
  )

  const transformedFilters = filters.map((filter) => ({
    ...filter,
    imageUrl: `${BASE_URL}${filter.imageUrl}`,
  }))

  const filterMap = new Map<string, Filter>()
  transformedFilters.forEach((filter) => {
    filterMap.set(filter.id, filter)
  })

  return filterMap
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
