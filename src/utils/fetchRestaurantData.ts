import { transformRestaurantDataApiToDomain } from '@/transformers/restaurantApiToDomainTransformer'
import { transformFilterDataApiToDomain } from '@/transformers/filterApiToDomainTransformer'

import type { Restaurant, RestaurantWithDetails, ApiRestaurant } from '@/interfaces/restaurant'
import type { OpenStatus } from '@/interfaces/open-status'
import type { PriceRange } from '@/interfaces/price-range'
import type { ApiError } from '@/interfaces/api-error'
import type { ApiFilter, Filter } from '@/interfaces/filter'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const filterCache = new Map<string, Filter>()

if (!BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_BASE_URL is not defined.')
}

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

async function fetchFilter(filterId: string): Promise<Filter | null> {
  if (filterCache.has(filterId)) {
    return filterCache.get(filterId) as Filter
  }
  try {
    const apiFilter = await fetchWithErrorHandling<ApiFilter>(`${BASE_URL}/api/filter/${filterId}`)
    const filter = transformFilterDataApiToDomain(apiFilter)
    filterCache.set(filterId, filter)
    return filter
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`Error fetching filter ${filterId}: ${errorMessage}`)
    return null
  }
}

export const fetchRestaurantData = async (): Promise<{
  restaurantWithDetails: RestaurantWithDetails[]
  filters: Filter[]
}> => {
  try {
    const { restaurants } = await fetchWithErrorHandling<{ restaurants: ApiRestaurant[] }>(
      `${BASE_URL}/api/restaurants`,
    )

    let domainRestaurants = restaurants.map(transformRestaurantDataApiToDomain)

    domainRestaurants = domainRestaurants.map((restaurant) => ({
      ...restaurant,
      imageUrl: `${BASE_URL}${restaurant.imageUrl}`,
    }))

    const allFilterIds = Array.from(
      new Set(domainRestaurants.flatMap((restaurant) => restaurant.filterIds)),
    )

    const fetchFilterPromises = allFilterIds.map((filterId) => fetchFilter(filterId))

    let filters = (await Promise.all(fetchFilterPromises)).filter(
      (filter): filter is Filter => filter !== null,
    )

    filters = filters.map((filter) => ({
      ...filter,
      imageUrl: `${BASE_URL}${filter.imageUrl}`,
    }))

    const filterMap = new Map<string, Filter>()
    filters.forEach((filter) => {
      filterMap.set(filter.id, filter)
    })

    const restaurantDetailsPromises = domainRestaurants.map(async (restaurant) => {
      const [openStatusResult, priceRangeResult] = await Promise.all([
        fetchWithErrorHandling<OpenStatus>(`${BASE_URL}/api/open/${restaurant.id}`).catch(
          (error) => {
            console.warn(
              `Error fetching open status for ${restaurant.name}: ${error?.message || 'Unknown error'}`,
            )
            return null
          },
        ),
        fetchWithErrorHandling<PriceRange>(
          `${BASE_URL}/api/price-range/${restaurant.priceRangeId}`,
        ).catch((error) => {
          console.warn(
            `Error fetching price range for ${restaurant.name}: ${error?.message || 'Unknown error'}`,
          )
          return null
        }),
      ])

      const openStatus = openStatusResult || {
        restaurant_id: restaurant.id,
        is_open: false,
      }
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
    })

    const restaurantWithDetails: RestaurantWithDetails[] =
      await Promise.all(restaurantDetailsPromises)

    const sortedRestaurants = restaurantWithDetails.sort((a, b) => {
      return a.openStatus.is_open === b.openStatus.is_open ? 0 : a.openStatus.is_open ? -1 : 1
    })

    return {
      restaurantWithDetails: sortedRestaurants,
      filters,
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
