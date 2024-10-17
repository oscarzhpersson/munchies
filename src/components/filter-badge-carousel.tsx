import React from 'react'

import { BadgeCarousel } from './badge-carousel'

import type { Filter } from '@/interfaces/filter'

export interface FilterBadgeCarouselProps {
  activeId: string | null
  filters: Filter[]
}

export function FilterBadgeCarousel(props: FilterBadgeCarouselProps) {
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
          active={filter.id == props.activeId}
        />
      ))}
    </div>
  )
}
