import slugify from 'slugify'

/**
 * Converts a string into a URL-friendly slug.
 *
 * @param {string} input - The string to slugify.
 * @returns {string} - The slugified version of the input.
 */
export const slugifyFilter = (input: string): string => {
  return slugify(input, { lower: true, strict: true })
}

/**
 * Extracts filters from a URL parameter.
 *
 * @param {string | string[] | undefined} param - The URL parameter which can be a string, an array of strings, or undefined.
 * @returns {string[]} - An array of filters extracted from the URL parameter.
 */
export function extractFiltersFromUrlParam(param: string | string[] | undefined): string[] {
  return Array.isArray(param) ? param.flatMap((p) => p.split(',')) : param ? param.split(',') : []
}
