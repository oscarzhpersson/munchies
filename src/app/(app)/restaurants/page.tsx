import React from 'react'
import Image from 'next/image'

import { FilterBadgeCarousel } from '@/components/filter-badge-carousel'
import { RestaurantGrid } from '@/components/restaurant-grid'
import { FilterMenu } from '@/components/filter-menu'
import { AppOverlay } from '@/components/app-overlay'

import { fetchPageData } from '@/services/fetchPageData'
import { fetchRestaurantData } from '@/services/restaurantService'
import { fetchLogo } from '@/services/fetchLogo'
import { fetchDeliveryTimeRanges } from '@/services/fetchDeliveryRanges'
import { fetchOverlayContent } from '@/services/fetchOverlayContent'

import { formatNumberToDeliveryTimeRange } from '@/utils/formatNumberToDeliveryTimeRange'
import { extractPriceRanges } from '@/utils/extractPriceRanges'

import type { RestaurantWithDetails } from '@/interfaces/restaurant'

const Page = async () => {
  try {
    const [page, restaurantData, logoUrl, deliveryTimeRanges, overlayContent] = await Promise.all([
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
      fetchOverlayContent().catch((err) => {
        throw new Error('Error fetching overlay content:', err)
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

    const priceRanges = extractPriceRanges(enrichedRestaurants)

    // TODO: Add accessibility functionality for perfect light house score.
    // TODO: Add proper error message display if necessary.

    // ? In type filter menu when hovering over the first element the entire container shrinks.

    return (
      <div className="w-full max-w-screen-displayMax mx-auto mb-6">
        <AppOverlay className="md:hidden" overlay={overlayContent} />
        <header className="grid grid-cols-12 w-full gap-4 md:px-8 md:gap-0 lg:px-0">
          <Image
            src={logoUrl}
            alt="logo"
            width={275}
            height={40}
            className="col-span-12 mx-8 md:mx-0 mt-11 min-w-[167px] w-[167px] h-10 md:w-[275px] md:h-[40px] md:my-11"
          />
          <div className="col-span-12 md:col-span-3 lg:col-span-2 mb-4 mx-8 md:mx-0 md:mb-0">
            <FilterMenu
              filters={filters}
              deliveryTimeRanges={deliveryTimeRanges}
              priceRanges={priceRanges}
            />
          </div>
          <main className="col-span-12 md:col-span-9 lg:col-span-10 ml-8 md:ml-4">
            <FilterBadgeCarousel filters={filters} />
            <div className="flex flex-col justify-between mr-8 md:mr-0">
              <h1 className="text-h1 md:text-display mt-6 mb-4 md:mt-11 md:mb-9">
                {page.title || 'title'}
              </h1>
              <RestaurantGrid restaurants={enrichedRestaurants} />
            </div>
          </main>
        </header>
      </div>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return <div>Sorry, something went wrong.</div>
  }
}

export default Page
