import { fetchWithErrorHandling } from './apiClient'

import type { OpenStatus } from '@/interfaces/open-status'

/** Base URL for the API endpoints. */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

if (!BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_BASE_URL is not defined.')
}

/**
 * Fetches the open status of a restaurant by its ID.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<OpenStatus>} - A promise that resolves to the OpenStatus object or null if an error occurs.
 * * @throws Will throw an error if the network response is not ok or if the data contains an error.
 */
export async function fetchOpenStatus(restaurantId: string): Promise<OpenStatus> {
  try {
    return await fetchWithErrorHandling<OpenStatus>(`${BASE_URL}/api/open/${restaurantId}`)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`Error fetching open status for restaurant ${restaurantId}: ${errorMessage}`)
    throw new Error('Failed to fetch open status')
  }
}
