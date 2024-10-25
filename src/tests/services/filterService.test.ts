import { describe, expect, beforeEach, afterEach, jest, it } from '@jest/globals'
import { updateFilterInUrl } from '@/services/filterService'

describe('updateFilterInUrl', () => {
  beforeEach(() => {
    window.history.replaceState = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should add a new filter to the URL', () => {
    const pathname = '/restaurants'
    const searchParams = new URLSearchParams()
    const filterType = 'category'
    const filterToUpdate = 'vegan'

    updateFilterInUrl(pathname, searchParams, filterType, filterToUpdate)

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '/restaurants?category=vegan',
    )
  })

  it('should add multiple filters to the same type in the URL', () => {
    const pathname = '/restaurants'
    const searchParams = new URLSearchParams('category=vegan')
    const filterType = 'category'
    const filterToUpdate = 'vegetarian'

    updateFilterInUrl(pathname, searchParams, filterType, filterToUpdate)

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '/restaurants?category=vegan%2Cvegetarian',
    )
  })

  it('should remove a filter from the URL if it already exists', () => {
    const pathname = '/restaurants'
    const searchParams = new URLSearchParams('category=vegan,vegetarian')
    const filterType = 'category'
    const filterToUpdate = 'vegetarian'

    updateFilterInUrl(pathname, searchParams, filterType, filterToUpdate)

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '/restaurants?category=vegan',
    )
  })

  it('should remove the filter type from the URL if no filters remain', () => {
    const pathname = '/restaurants'
    const searchParams = new URLSearchParams('category=vegan')
    const filterType = 'category'
    const filterToUpdate = 'vegan'

    updateFilterInUrl(pathname, searchParams, filterType, filterToUpdate)

    expect(window.history.replaceState).toHaveBeenCalledWith(null, '', '/restaurants?')
  })
})
