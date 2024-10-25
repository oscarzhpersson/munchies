'use client'

import React, { useEffect, useState } from 'react'

import { BadgeCarousel } from '../badge-carousel/badge-carousel'

import { usePathname, useSearchParams } from 'next/navigation'
import { updateFilterInUrl } from '@/services/filterService'
import { slugifyFilter } from '@/utils/urlHelpers'

import type { Filter } from '@/interfaces/api/filter'

export interface FilterBadgeCarouselProps {
  filters: Filter[]
}

export function FilterBadgeCarousel(props: FilterBadgeCarouselProps) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleFilterUpdate = (filterToUpdate: string) => {
    const slugifiedFilter = slugifyFilter(filterToUpdate)
    updateFilterInUrl(pathname, searchParams, 'category', slugifiedFilter)

    setActiveFilters((prevFilters) => {
      const newFilters = new Set(prevFilters)
      if (newFilters.has(slugifiedFilter)) {
        newFilters.delete(slugifiedFilter)
      } else {
        newFilters.add(slugifiedFilter)
      }
      return newFilters
    })
  }

  const isActive = (filter: string) => activeFilters.has(slugifyFilter(filter))

  useEffect(() => {
    const categoryFilters = searchParams.get('category')?.split(',') || []
    setActiveFilters(new Set(categoryFilters))
  }, [searchParams])

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
          active={isActive(filter.name)}
          updateFilterSelection={handleFilterUpdate}
        />
      ))}
    </div>
  )
}
