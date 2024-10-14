import React from 'react'

import { RestaurantCard, RestaurantCardProps } from './restaurant-card'

export interface RestaurantGridProps {
  restaurants: RestaurantCardProps[]
}

export function RestaurantGrid(props: RestaurantGridProps) {
  return (
    <div className="flex justify-center md:justify-start w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            id={restaurant.id}
            title={restaurant.title}
            open={restaurant.open}
            rating={restaurant.rating}
            filterIds={restaurant.filterIds}
            deliveryTime={restaurant.deliveryTime}
            priceRange={restaurant.priceRange}
            image={restaurant.image}
          />
        ))}
      </div>
    </div>
  )
}
