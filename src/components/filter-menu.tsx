'use client'

import React, { memo } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { updateFilterInUrl } from '@/services/filterService'
import { slugifyFilter } from '@/utils/urlHelpers'

import type { Filter } from '@/interfaces/filter'
import type { DeliveryTime } from '@/interfaces/delivery-time'

export interface FilterMenuProps {
  filters: Filter[]
  deliveryTimeRanges: DeliveryTime | null
  priceRanges: string[]
}

const FilterCard = memo(
  ({
    updateFilterSelection,
    filterType,
    filter,
    active,
  }: {
    updateFilterSelection: (filterType: string, filter: string) => void
    filterType: string
    filter: string
    active: boolean
  }) => {
    return (
      <button
        aria-label={'Filter toggle - ' + filter}
        onClick={() => updateFilterSelection(filterType, filter.toLowerCase())}
        className={`items-center rounded-lg w-fit hover:scale-95 transition-transform duration-50 ease-in-out relative border-0.6
                    ${active ? 'bg-green border-green text-white' : 'border-stroke bg-white text-black'} p-1.5 px-3`}
      >
        <p aria-label={'Filter' + filter} className={`text-body select-none`}>
          {filter}
        </p>
      </button>
    )
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
  },
)

export function FilterMenu(props: FilterMenuProps) {
  const router = useRouter()

  const searchParams = useSearchParams()
  const filterParam = searchParams.get('filter')
  const filtersFromUrl = filterParam ? filterParam.split(',') : []
  const filtersFromUrlSlugified = filtersFromUrl.map(slugifyFilter)

  const handleFilterUpdate = (filterType: string, filterToUpdate: string) => {
    updateFilterInUrl(router, filterType, slugifyFilter(filterToUpdate))
  }

  const filterComparison = (filter: string) => {
    return filtersFromUrlSlugified.includes(slugifyFilter(filter))
  }

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
              filterType="category"
              updateFilterSelection={handleFilterUpdate}
              filter={filter.name}
              active={filterComparison(filter.name)}
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
              filterType="deliveryTime"
              updateFilterSelection={handleFilterUpdate}
              filter={deliveryTimeRange.label}
              active={filterComparison(deliveryTimeRange.label)}
            />
          ))}
          {props.deliveryTimeRanges?.upperFallback && (
            <FilterCard
              key={props.deliveryTimeRanges.ranges?.length}
              filterType="deliveryTime"
              updateFilterSelection={handleFilterUpdate}
              filter={props.deliveryTimeRanges.upperFallback}
              active={filterComparison(props.deliveryTimeRanges.upperFallback)}
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
              filterType="price"
              updateFilterSelection={handleFilterUpdate}
              filter={priceRange}
              active={filterComparison(priceRange)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
