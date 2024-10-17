import React from 'react'
import Image from 'next/image'

import { FilterBadgeCarousel } from '@/components/filter-badge-carousel'
import { RestaurantGrid } from '@/components/restaurant-grid'

import { fetchPageData } from '@/utils/fetchPageData'
import { fetchRestaurantData } from '@/utils/fetchRestaurantData'
import { fetchLogo } from '@/utils/fetchLogo'
import { fetchDeliveryTimeRanges } from '@/utils/fetchDeliveryRanges'

import { formatNumberToDeliveryTimeRange } from '@/utils/formatNumberToDeliveryTimeRange'

import type { RestaurantWithDetails } from '@/interfaces/restaurant'

const Page = async () => {
  try {
    const [page, restaurantData, logoUrl, deliveryTimeRanges] = await Promise.all([
      fetchPageData('restaurants').catch((err) => {
        throw new Error('Error fetching page data:', err)
      }),
      fetchRestaurantData().catch((err) => {
        throw new Error('Error fetching restaurant data:', err)
      }),
      fetchLogo().catch((err) => {
        throw new Error('Error fetching logo:', err)
      }),
      fetchDeliveryTimeRanges().catch((err) => {
        throw new Error('Error fetching delivery time ranges:', err)
      }),
    ])

    const { restaurantWithDetails: restaurants, filters } = restaurantData

    const enrichedRestaurants: RestaurantWithDetails[] = restaurants.map((restaurant) => ({
      ...restaurant,
      deliveryTimeLabel: formatNumberToDeliveryTimeRange(
        restaurant.deliveryTimeInMinutes,
        deliveryTimeRanges,
      ),
    }))

    // TODO: Add drop shadow style to all components.
    // TODO: Top filter bar and filters should be the same.
    // TODO: Instead of using useState maybe use a context to store the active filters or use the URL.
    // TODO: Add proper error message display if necessary.

    return (
      <div className="w-full min-w-screen-displayMin max-w-screen-displayMax mx-auto">
        <header className="grid grid-cols-12 w-full">
          <Image src={logoUrl} alt="logo" width={275} height={40} className="col-span-12 my-11" />
          <div className="col-span-2 bg-white rounded-lg border-0.6 border-stroke"></div>
          <main className="col-span-10 ml-4">
            <FilterBadgeCarousel activeId={null} filters={filters} />
            <div className="flex flex-col justify-between">
              <h1 className="text-display mt-[2.5rem] mb-9">{page.title || 'title'}</h1>
              <RestaurantGrid restaurants={enrichedRestaurants} />
            </div>
          </main>
        </header>
      </div>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default Page
