import React from 'react'
import Image from 'next/image'

export interface BadgeCarouselProps {
  title: string
  active?: boolean
  image: {
    url: string
    alt: string
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export function BadgeCarousel({ title, image, active }: BadgeCarouselProps) {
  return (
    <button
      className={`flex flex-row justify-between items-center flex-shrink-0 snap-start
                bg-white w-40 h-20 rounded-lg relative border-0.6 border-stroke
                hover:bg-strokeOpaque hover:scale-95 transition-transform focus-visible:outline-none duration-50
                ease-in-out ${active ? 'bg-strokeOpaque' : 'focus:bg-strokeOpaque focus:scale-95'}`}
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
        src={`${BASE_URL}${image.url}`}
        alt={image.alt || title}
      />
    </button>
  )
}
