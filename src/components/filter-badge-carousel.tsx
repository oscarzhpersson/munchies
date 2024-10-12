import React from 'react'

import { BadgeCarousel } from './badge-carousel'

export interface FilterBadgeCarouselProps {
  activeId: string
  badges: {
    id: string
    title: string
    image: {
      id: string
      url: string
      alt: string
    }
  }[]
}

export function FilterBadgeCarousel(props: FilterBadgeCarouselProps) {
  return (
    <div
      className="flex flex-row gap-2.5 overflow-x-auto flex-nowrap
                whitespace-nowrap snap-x snap-proximity hide-scrollbar"
    >
      {props.badges.map((badge, index) => (
        <BadgeCarousel
          key={index}
          title={badge.title}
          image={badge.image}
          active={badge.id == props.activeId}
        />
      ))}
    </div>
  )
}
