import { useRouter } from 'next/navigation'

type RouterType = ReturnType<typeof useRouter>

/**
 * Updates the filter parameter in the URL without reloading the page.
 *
 * @param {RouterType} router - The Next.js router instance.
 * @param {string} filterType - The type of the filter (e.g., type, deliveryTime, price).
 * @param {string} filterToUpdate - The filter value to add or remove from the URL.
 */
export const updateFilterInUrl = (
  router: RouterType,
  pathname: string,
  searchParams: URLSearchParams,
  filterType: string,
  filterToUpdate: string,
) => {
  const params = new URLSearchParams(searchParams.toString())

  let filters = params.get(filterType)?.split(',') || []

  if (filters.includes(filterToUpdate)) {
    filters = filters.filter((filter) => filter !== filterToUpdate)
  } else {
    filters.push(filterToUpdate)
  }

  if (filters.length > 0) {
    params.set(filterType, filters.join(','))
  } else {
    params.delete(filterType)
  }

  router.replace(`${pathname}?${params.toString()}`)
}
