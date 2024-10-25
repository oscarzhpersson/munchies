'use client'

import React from 'react'

import { useSearchParams } from 'next/navigation'
import RestaurantCard, { RestaurantCardProps } from './restaurant-card'
import { RestaurantWithDetails } from '@/interfaces/api/restaurant'
import { filterRestaurants } from '@/utils/filterHelpers'
import { extractFiltersFromUrlParam } from '@/utils/urlHelpers'

export interface RestaurantGridProps {
  restaurants: RestaurantWithDetails[]
}

export function RestaurantGrid(props: RestaurantGridProps) {
  const searchParams = useSearchParams()

  const categoriesFromUrl = extractFiltersFromUrlParam(searchParams.get('category')?.split(','))
  const deliveryTimesFromUrl = extractFiltersFromUrlParam(
    searchParams.get('deliveryTime')?.split(','),
  )
  const priceRangesFromUrl = extractFiltersFromUrlParam(searchParams.get('priceRange')?.split(','))

  const filteredRestaurants = filterRestaurants(
    props.restaurants,
    categoriesFromUrl,
    deliveryTimesFromUrl,
    priceRangesFromUrl,
  )

  return (
    <div className="md:flex md:justify-start md:w-full">
      <div className="flex flex-row flex-wrap gap-4">
        {filteredRestaurants.map((restaurant, index) => {
          const restaurantCardProps: RestaurantCardProps = {
            id: restaurant.id,
            title: restaurant.name,
            open: restaurant.openStatus.is_open,
            rating: restaurant.rating,
            filterIds: restaurant.filterIds,
            deliveryTime: restaurant.deliveryTimeLabel || null,
            priceRange: restaurant.priceRange ? restaurant.priceRange.range : 'N/A',
            image: {
              url: `${restaurant.imageUrl}`,
              alt: `${restaurant.name} Image`,
            },
          }

          return <RestaurantCard key={index} {...restaurantCardProps} />
        })}
        {filteredRestaurants.length === 0 && (
          <div aria-live="polite" className="w-full h-full text-title text-black">
            No restaurants matching selected criteria
          </div>
        )}
      </div>
    </div>
  )
}
