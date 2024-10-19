import React from 'react'

import { RestaurantCard, RestaurantCardProps } from './restaurant-card'
import { RestaurantWithDetails } from '@/interfaces/restaurant'

export interface RestaurantGridProps {
  restaurants: RestaurantWithDetails[]
}

export function RestaurantGrid(props: RestaurantGridProps) {
  return (
    <div className="md:flex md:justify-start md:w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
    </div>
  )
}
