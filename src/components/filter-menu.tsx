'use client'

import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { updateFilterInUrl, useCurrentFiltersFromUrl } from '@/services/filterService'

import type { Filter } from '@/interfaces/filter'
import type { DeliveryTime } from '@/interfaces/delivery-time'

export interface FilterMenuProps {
  filters: Filter[]
  deliveryTimeRanges: DeliveryTime | null
  priceRanges: string[]
}

const FilterCard = ({
  updateFilterSelection,
  filter,
  active,
}: {
  updateFilterSelection: (filter: string) => void
  filter: string
  active: boolean
}) => {
  return (
    <button
      onClick={() => updateFilterSelection(filter.toLowerCase())}
      className={`bg-white items-center rounded-lg w-fit hover:scale-95 transition-transform duration-50 ease-in-out
                    relative ${active ? 'border-[1px] border-black' : 'border-0.6 border-stroke'} p-1.5 px-3`}
    >
      <p
        aria-label={'Filter' + filter}
        className={`text-body select-none
                    ${active ? 'font-medium' : 'font-normal'}`}
      >
        {filter}
      </p>
    </button>
  )
}

export function FilterMenu(props: FilterMenuProps) {
  const router = useRouter()
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterUpdate = (filterToUpdate: string) => {
    updateFilterInUrl(router, filterToUpdate)
  }

  /*useEffect(() => {
    const filtersFromUrl = useCurrentFiltersFromUrl()
    setActiveFilters(filtersFromUrl)
  }, [])*/

  return (
    <div
      className="w-full md:bg-white md:rounded-md md:border-0.6
                    md:h-full md:border-stroke md:munchies-shadow md:p-6"
    >
      <h3 className="text-h1 hidden md:block">Filter</h3>
      <div className="hidden md:block">
        <p className="text-subtitle font-semibold opacity-40 mb-4 mt-8">FOOD CATEGORY</p>
        <div className="flex flex-col flex-wrap my-4 gap-2">
          {props.filters.map((filter, index) => (
            <FilterCard
              key={index}
              updateFilterSelection={handleFilterUpdate}
              filter={filter.name}
              active={activeFilters.includes(filter.name.toLowerCase())}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-subtitle font-semibold opacity-40 mb-2 lg:mb-4 lg:mt-8">DELIVERY TIME</p>
        <div
          className="flex flex-row gap-2 overflow-x-scroll flex-nowrap whitespace-nowrap snap-x
                        snap-proximity hide-scrollbar md:flex-wrap md:overflow-visible md:whitespace-normal"
        >
          {props.deliveryTimeRanges?.ranges?.map((deliveryTimeRange, index) => (
            <FilterCard
              key={index}
              updateFilterSelection={handleFilterUpdate}
              filter={deliveryTimeRange.label}
              active={false}
            />
          ))}
          {props.deliveryTimeRanges?.upperFallback && (
            <FilterCard
              key={props.deliveryTimeRanges.ranges?.length}
              updateFilterSelection={handleFilterUpdate}
              filter={props.deliveryTimeRanges.upperFallback}
              active={activeFilters.includes(props.deliveryTimeRanges.upperFallback.toLowerCase())}
            />
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <p className="text-subtitle font-semibold opacity-40 mb-4 mt-8">PRICE RANGE</p>
        <div className="flex flex-row flex-wrap my-4 gap-2">
          {props.priceRanges.map((priceRange, index) => (
            <FilterCard
              key={index}
              updateFilterSelection={handleFilterUpdate}
              filter={priceRange}
              active={activeFilters.includes(priceRange.toLowerCase())}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
