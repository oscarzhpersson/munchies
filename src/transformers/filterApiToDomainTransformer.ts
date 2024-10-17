import type { Filter, ApiFilter } from '@/interfaces/filter'

export function transformFilterDataApiToDomain(apiResponse: ApiFilter): Filter {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    imageUrl: apiResponse.image_url,
  }
}
