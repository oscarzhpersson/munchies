import type { OpenStatus } from './open-status'
import type { PriceRange } from './price-range'
import type { Filter } from './filter'

export interface ApiRestaurant {
  id: string
  name: string
  rating: number
  filter_ids: string[]
  image_url: string
  delivery_time_in_minutes: number
  price_range_id: string
}

export interface Restaurant {
  id: string
  name: string
  rating: number
  filterIds: string[]
  imageUrl: string
  deliveryTimeInMinutes: number
  priceRangeId: string
}

export interface RestaurantWithDetails extends Restaurant {
  openStatus: OpenStatus
  priceRange: PriceRange | null
  filters: Filter[]
}
