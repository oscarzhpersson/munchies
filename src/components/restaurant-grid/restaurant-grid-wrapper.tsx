'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { RestaurantGrid } from './restaurant-grid'
import { extractFiltersFromUrlParam } from '@/utils/urlHelpers'

import type { RestaurantWithDetails } from '@/interfaces/api/restaurant'

interface RestaurantGridWrapperProps {
  restaurants: RestaurantWithDetails[]
}

export function RestaurantGridWrapper({ restaurants }: RestaurantGridWrapperProps) {
  const searchParams = useSearchParams()

  const categoriesFromUrl = extractFiltersFromUrlParam(searchParams.get('category')?.split(','))
  const deliveryTimesFromUrl = extractFiltersFromUrlParam(
    searchParams.get('deliveryTime')?.split(','),
  )
  const priceRangesFromUrl = extractFiltersFromUrlParam(searchParams.get('priceRange')?.split(','))

  return (
    <RestaurantGrid
      restaurants={restaurants}
      categories={categoriesFromUrl}
      deliveryTimes={deliveryTimesFromUrl}
      priceRanges={priceRangesFromUrl}
    />
  )
}
