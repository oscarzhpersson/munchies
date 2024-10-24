'use client'

import React from 'react'

import { BadgeCarousel } from '../badge-carousel/badge-carousel'

import { useRouter } from 'next/navigation'
import { updateFilterInUrl } from '@/services/filterService'
import { slugifyFilter } from '@/utils/urlHelpers'

import type { Filter } from '@/interfaces/api/filter'

export interface FilterBadgeCarouselProps {
  activeFilters: string[]
  filters: Filter[]
}

export function FilterBadgeCarousel(props: FilterBadgeCarouselProps) {
  const router = useRouter()

  const handleFilterUpdate = (filterToUpdate: string) => {
    updateFilterInUrl(router, 'category', slugifyFilter(filterToUpdate))
  }

  const filterComparison = (filter: string) => {
    return props.activeFilters.includes(slugifyFilter(filter))
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
