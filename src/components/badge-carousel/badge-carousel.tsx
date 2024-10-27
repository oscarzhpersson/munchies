import React, { memo } from 'react'
import Image from 'next/image'

export interface BadgeCarouselProps {
  title: string
  active?: boolean
  image: {
    url: string
    alt: string
  }
  updateFilterSelection: (filter: string) => void
}

export function BadgeCarousel({ title, image, active, updateFilterSelection }: BadgeCarouselProps) {
  return (
    <div
      className="relative w-40 h-20 flex-shrink-0 snap-start overflow-visible"
      style={{ transformOrigin: 'center' }}
    >
      <button
        onClick={() => updateFilterSelection(title.toLowerCase())}
        className={`flex flex-row absolute justify-between items-center w-full h-full
                border-0.6 border-stroke hover:scale-95 munchies-shadow rounded-lg
                transition-transform will-change-transform duration-50 focus:border-1 ease-in-out
                ${active ? 'bg-green text-offWhite shadow-inner' : 'bg-white text-black'}`}
        style={{ transformOrigin: 'center' }}
        aria-label={'Filter toggle - ' + title}
      >
        <span
          className="text-sm font-normal leading-none tracking-[-0.5px]
                    absolute top-4 left-3"
        >
          {title}
        </span>
        <Image
          className="object-cover aspect-square pointer-events-none
                    translate-x-[5.55rem] absolute"
          width={80}
          height={80}
          src={`${image.url}`}
          alt={image.alt || title}
        />
      </button>
    </div>
  )
}

export default memo(BadgeCarousel)
