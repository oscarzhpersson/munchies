import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FilterBadgeCarousel } from '@/components/filter-menu/filter-badge-carousel'
import { RestaurantGrid } from '@/components/restaurant-grid/restaurant-grid'
import { FilterMenu } from '@/components/filter-menu/filter-menu'
import { AppOverlay } from '@/components/app/app-overlay'

import { fetchPageData } from '@/services/cms/fetchPageData'
import { fetchLogo } from '@/services/cms/fetchLogo'
import { fetchDeliveryTimeRanges } from '@/services/cms/fetchDeliveryRanges'
import { fetchOverlayContent } from '@/services/cms/fetchOverlayContent'

import { formatNumberToDeliveryTimeRange } from '@/utils/formatNumberToDeliveryTimeRange'
import { extractPriceRanges } from '@/utils/extractPriceRanges'
import { extractFiltersFromUrlParam } from '@/utils/urlHelpers'
import { filterRestaurants } from '@/utils/filterHelpers'

import type { Restaurant, RestaurantWithDetails } from '@/interfaces/api/restaurant'

interface PageProps {
  searchParams: {
    category?: string | string[]
    deliveryTime?: string | string[]
    priceRange?: string | string[]
  }
}

export const revalidate = 300

const Page = async ({ searchParams }: PageProps) => {
  const categoriesFromUrl = extractFiltersFromUrlParam(searchParams.category)
  const deliveryTimesFromUrl = extractFiltersFromUrlParam(searchParams.deliveryTime)
  const priceRangesFromUrl = extractFiltersFromUrlParam(searchParams.priceRange)

  try {
    const [page, restaurantData, logoUrl, deliveryTimeRanges, overlayContent] = await Promise.all([
      fetchPageData('restaurants').catch((err) => {
        throw new Error('Error fetching page data:', err)
      }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/restaurants`)
        .then((res) => res.json())
        .catch((err) => {
          throw new Error('Error fetching restaurant data from API route:', err)
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

    const enrichedRestaurants: RestaurantWithDetails[] = restaurants.map(
      (restaurant: Restaurant) => ({
        ...restaurant,
        deliveryTimeLabel: formatNumberToDeliveryTimeRange(
          restaurant.deliveryTimeInMinutes,
          deliveryTimeRanges,
        ),
      }),
    )

    const priceRanges = extractPriceRanges(enrichedRestaurants)

    const filteredRestaurants = filterRestaurants(
      enrichedRestaurants,
      categoriesFromUrl,
      deliveryTimesFromUrl,
      priceRangesFromUrl,
    )

    // TODO: Add proper error message display if necessary.

    // ? In type filter menu when hovering over the first element the entire container shrinks.

    return (
      <div className="w-full max-w-screen-displayMax lg:mx-8 mb-6">
        <AppOverlay className="sm:hidden" overlay={overlayContent} />
        <header className="grid grid-cols-12 w-full gap-4 sm:px-8 sm:gap-0 lg:px-0">
          <Link
            aria-label="Munchies logo"
            className="col-span-12 mx-8 sm:mx-0 mt-11 min-w-[167px] w-[167px] h-10 sm:w-[275px] sm:h-[40px] sm:my-11"
            href="/restaurants"
          >
            <Image src={logoUrl} alt="logo" width={275} height={40} className="w-full h-full" />
          </Link>
          <div className="col-span-12 sm:col-span-2 lg:col-span-2 mb-4 mx-8 sm:mx-0 sm:mb-0">
            <FilterMenu
              activeFilters={[...categoriesFromUrl, ...deliveryTimesFromUrl, ...priceRangesFromUrl]}
              filters={filters}
              deliveryTimeRanges={deliveryTimeRanges}
              priceRanges={priceRanges}
            />
          </div>
          <main className="col-span-12 sm:col-span-10 lg:col-span-10 ml-8 sm:ml-4">
            <FilterBadgeCarousel activeFilters={categoriesFromUrl} filters={filters} />
            <div className="flex flex-col justify-between mr-8 sm:mr-0">
              <h1 className="text-h1 sm:text-display mt-6 mb-4 sm:mt-11 sm:mb-9">
                {page.title || 'title'}
              </h1>
              <RestaurantGrid restaurants={filteredRestaurants} />
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
