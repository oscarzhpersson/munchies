import type { ApiError } from '@/interfaces/api/api-error'

/**
 * Fetches data from the given URL with error handling.
 * @template T - The expected type of the response data.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<T>} - A promise that resolves to the fetched data of type T.
 * @throws Will throw an error if the network response is not ok or if the data contains an error.
 */
export async function fetchWithErrorHandling<T extends Object>(url: string): Promise<T> {
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
