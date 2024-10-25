import { describe, expect, test } from '@jest/globals'
import { transformFilterDataApiToDomain } from '@/transformers/filterApiToDomainTransformer'

import type { ApiFilter, Filter } from '@/interfaces/api/filter'

describe('transformFilterDataApiToDomain', () => {
  test('should transform ApiFilter data to Filter model correctly', () => {
    // Arrange
    const apiResponse: ApiFilter = {
      id: '123',
      name: 'Vegan',
      image_url: 'https://example.com/vegan.png',
    }

    const expectedResult: Filter = {
      id: '123',
      name: 'Vegan',
      imageUrl: 'https://example.com/vegan.png',
    }

    // Act
    const result = transformFilterDataApiToDomain(apiResponse)

    // Assert
    expect(result).toEqual(expectedResult)
  })
})
