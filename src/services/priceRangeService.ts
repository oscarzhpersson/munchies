import { fetchWithErrorHandling } from './apiClient'

import type { PriceRange } from '@/interfaces/price-range'

/** Base URL for the API endpoints. */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

if (!BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_BASE_URL is not defined.')
}

/**
 * Fetches the price range information by its ID.
 * @param {string} priceRangeId - The ID of the price range.
 * @returns {Promise<PriceRange | null>} - A promise that resolves to the PriceRange object or null if an error occurs.
 * @throws Will throw an error if the network response is not ok or if the data contains an error.
 */
export async function fetchPriceRange(priceRangeId: string): Promise<PriceRange | null> {
  try {
    return await fetchWithErrorHandling<PriceRange>(`${BASE_URL}/api/price-range/${priceRangeId}`)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`Error fetching price range for price range ${priceRangeId}: ${errorMessage}`)
    throw new Error('Failed to fetch price range')
  }
}
