import { fetchWithErrorHandling } from './apiClient'
import { transformFilterDataApiToDomain } from '@/transformers/filterApiToDomainTransformer'

import type { Filter, ApiFilter } from '@/interfaces/api/filter'

/** Base URL for the API endpoints. */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

if (!BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_BASE_URL is not defined.')
}

/** Cache for storing fetched filters to avoid redundant API calls. */
const filterCache = new Map<string, Filter>()

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
 * Fetches and transforms filters based on an array of filter IDs.
 * @param {string[]} filterIds - An array of filter IDs to fetch.
 * @returns {Promise<Map<string, Filter>>} - A promise that resolves to a map of Filter objects keyed by their IDs.
 */
export async function fetchAndTransformFilters(filterIds: string[]): Promise<Map<string, Filter>> {
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
