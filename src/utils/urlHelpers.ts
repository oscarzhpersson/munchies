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
