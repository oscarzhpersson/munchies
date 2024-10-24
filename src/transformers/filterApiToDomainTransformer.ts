import type { Filter, ApiFilter } from '@/interfaces/api/filter'

/**
 * Transforms API filter data into the domain filter model.
 *
 * @param {ApiFilter} apiResponse - The API filter data received from the backend.
 * @returns {Filter} The transformed filter object suitable for frontend use.
 */
export function transformFilterDataApiToDomain(apiResponse: ApiFilter): Filter {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    imageUrl: apiResponse.image_url,
  }
}
