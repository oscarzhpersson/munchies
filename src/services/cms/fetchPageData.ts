import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Page } from '@/interfaces/cms/page'

import config from '@payload-config'

/**
 * Fetches page data from the CMS based on the provided slug.
 *
 * @param {string} slug - The slug of the page to fetch.
 * @returns {Promise<Page>} A promise that resolves to the page data.
 * @throws Will throw an error if the slug is invalid or if the page is not found.
 */
export const fetchPageData = async (slug: string) => {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug provided')
  }

  const payload = await getPayloadHMR({
    config,
  })

  const pageData = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!pageData.docs || pageData.docs.length === 0) {
    throw new Error(`No page found for slug: ${slug}`)
  }

  return pageData.docs[0] as Page
}
