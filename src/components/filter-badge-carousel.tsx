'use client'

import React from 'react'

import { BadgeCarousel } from './badge-carousel'

import { useRouter, useSearchParams } from 'next/navigation'
import { updateFilterInUrl } from '@/services/filterService'
import { slugifyFilter } from '@/utils/urlHelpers'

import type { Filter } from '@/interfaces/filter'

export interface FilterBadgeCarouselProps {
  filters: Filter[]
}

export function FilterBadgeCarousel(props: FilterBadgeCarouselProps) {
  const router = useRouter()

  const searchParams = useSearchParams()
  const filterParam = searchParams.get('filter')
  const filtersFromUrl = filterParam ? filterParam.split(',') : []

  const handleFilterUpdate = (filterToUpdate: string) => {
    updateFilterInUrl(router, slugifyFilter(filterToUpdate))
  }

  const filterComparison = (filter: string) => {
    return filtersFromUrl.includes(slugifyFilter(filter))
  }

  return (
    <div
      className="flex flex-row gap-2.5 overflow-x-auto flex-nowrap
                whitespace-nowrap snap-x snap-proximity hide-scrollbar"
    >
      {props.filters.map((filter, index) => (
        <BadgeCarousel
          key={index}
          title={filter.name}
          image={{
            url: filter.imageUrl,
            alt: filter.name + ' Image',
          }}
          active={filterComparison(filter.name.toLowerCase())}
          updateFilterSelection={handleFilterUpdate}
        />
      ))}
    </div>
  )
}
