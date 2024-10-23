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
    <button
      onClick={() => updateFilterSelection(title.toLowerCase())}
      className={`flex flex-row justify-between items-center flex-shrink-0 snap-start
                w-40 h-20 rounded-lg relative border-0.6 border-stroke munchies-shadow hover:scale-95
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
        className="object-cover aspect-square
                    translate-x-[5.55rem] absolute"
        width={80}
        height={80}
        src={`${image.url}`}
        alt={image.alt || title}
      />
    </button>
  )
}

export default memo(BadgeCarousel)
