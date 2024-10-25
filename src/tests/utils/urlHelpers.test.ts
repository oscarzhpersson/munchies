import { describe, expect, test, jest } from '@jest/globals'
import { slugifyFilter, extractFiltersFromUrlParam } from '@/utils/urlHelpers'
import slugify from 'slugify'

jest.mock('slugify', () => jest.fn())

describe('slugifyFilter', () => {
  test('should convert string into a slugified version', () => {
    const input = 'Pizza & Pasta'
    const slugifiedValue = 'pizza-and-pasta'

    const mockedSlugify = slugify as jest.MockedFunction<typeof slugify>
    mockedSlugify.mockReturnValue(slugifiedValue)

    const result = slugifyFilter(input)

    expect(mockedSlugify).toHaveBeenCalledWith(input, { lower: true, strict: true })
    expect(result).toBe(slugifiedValue)
  })
})

describe('extractFiltersFromUrlParam', () => {
  test('should return an array of filters when param is a comma-separated string', () => {
    const param = 'pizza,italian,mexican'
    const result = extractFiltersFromUrlParam(param)

    expect(result).toEqual(['pizza', 'italian', 'mexican'])
  })

  test('should return an array of filters when param is an array of strings', () => {
    const param = ['pizza,italian', 'mexican']
    const result = extractFiltersFromUrlParam(param)

    expect(result).toEqual(['pizza', 'italian', 'mexican'])
  })

  test('should return an empty array when param is undefined', () => {
    const param = undefined
    const result = extractFiltersFromUrlParam(param)

    expect(result).toEqual([])
  })

  test('should return an empty array when param is an empty string', () => {
    const param = ''
    const result = extractFiltersFromUrlParam(param)

    expect(result).toEqual([])
  })

  test('should handle a single filter in the string correctly', () => {
    const param = 'pizza'
    const result = extractFiltersFromUrlParam(param)

    expect(result).toEqual(['pizza'])
  })
})
