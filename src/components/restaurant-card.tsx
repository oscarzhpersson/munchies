import React from 'react'
import Image from 'next/image'

import { ArrowRightIcon } from '@heroicons/react/24/solid'

export interface RestaurantCardProps {
  id: string
  title: string
  open: boolean
  rating: number
  filterIds: string[]
  deliveryTime: string | null
  priceRange: string
  image: {
    url: string
    alt: string
  }
}

export function RestaurantCard(props: RestaurantCardProps) {
  console.log('RestaurantCardProps', props)
  return (
    <div
      className="relative w-[20.438rem] h-[12.625rem] bg-white rounded-lg border-0.6
                    border-stroke p-4 overflow-clip munchies-shadow"
    >
      <div className="absolute top-4 left-4 flex flex-row space-x-1 select-none">
        <span className="flex flex-row items-center bg-white border-0.6 border-stroke text-sm px-3 py-1.5 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-2.5 w-2.5 mr-2 ${props.open ? 'text-green' : 'text-black'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle cx="10" cy="10" r="10" />
          </svg>

          {props.open ? 'Open' : 'Closed'}
        </span>
        {props.open && props.deliveryTime && (
          <span className="bg-white border-0.6 border-stroke p-4 text-sm px-3 py-1.5 rounded-full">
            {props.deliveryTime}
          </span>
        )}
      </div>

      {!props.open && (
        <span
          className="absolute inset-0 m-auto rounded-lg flex items-center justify-center
                      bg-white border-0.6 border-stroke text-body px-3 py-2 w-fit h-fit"
        >
          {
            'Opens tomorrow at 12 pm' /* We seem to be living in a world where everything opens at 12. No need for CMS here */
          }
        </span>
      )}

      <h2
        className={`w-56 absolute bottom-4 left-4 text-h1 ${props.open ? 'opacity-100' : 'opacity-20'}`}
      >
        {props.title}
      </h2>

      <button
        disabled={!props.open}
        className={`absolute bottom-4 right-4 bg-green text-white rounded-full
                    p-2 h-10 w-10 flex justify-center items-center transition-transform
                    ease-in-out ${props.open ? 'hover:scale-95 opacity-100' : 'opacity-20'}`}
        aria-label="View restaurant details"
      >
        <ArrowRightIcon className="h-5 w-5" />
      </button>

      <Image
        src={props.image.url}
        alt={props.image.alt}
        width={140}
        height={140}
        className={`absolute top-[-1.875rem] right-[-1.875rem]
                    object-cover ${props.open ? 'opacity-100' : 'opacity-20'}`}
      />
    </div>
  )
}
