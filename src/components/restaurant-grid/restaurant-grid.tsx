import React from 'react'

import RestaurantCard, { RestaurantCardProps } from './restaurant-card'
import { RestaurantWithDetails } from '@/interfaces/api/restaurant'

export interface RestaurantGridProps {
  restaurants: RestaurantWithDetails[]
}

export function RestaurantGrid(props: RestaurantGridProps) {
  return (
    <div className="md:flex md:justify-start md:w-full">
      <div className="flex flex-row flex-wrap gap-4">
        {props.restaurants.map((restaurant, index) => {
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
        {props.restaurants.length === 0 && (
          <div className="w-full h-full text-title text-black">
            No restaurants matching selected criteria
          </div>
        )}
      </div>
    </div>
  )
}
