import { useRouter } from 'next/navigation'

type RouterType = ReturnType<typeof useRouter>

/**
 * Updates the filter parameter in the URL without reloading the page.
 *
 * @param {RouterType} router - The Next.js router instance.
 * @param {string} filterToUpdate - The filter value to add or remove from the URL.
 */
export const updateFilterInUrl = (router: RouterType, filterToUpdate: string) => {
  const currentUrl = new URL(window.location.href)
  const searchParams = new URLSearchParams(currentUrl.search)

  let filters = searchParams.get('filter')?.split(',') || []
  if (filters.includes(filterToUpdate)) {
    filters = filters.filter((filter) => filter !== filterToUpdate)
  } else {
    filters.push(filterToUpdate)
  }

  if (filters.length > 0) {
    searchParams.set('filter', filters.join(','))
  } else {
    searchParams.delete('filter')
  }

  router.replace(`${currentUrl.pathname}?${searchParams.toString()}`)
}
