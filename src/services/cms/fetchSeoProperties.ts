import config from '@payload-config'

import { getPayloadHMR } from '@payloadcms/next/utilities'

/**
 * Fetches the SEO meta description from the CMS.
 *
 * @returns {Promise<string>} A promise that resolves to the SEO description.
 * @throws Will throw an error if the data is not found.
 */
export const fetchMetaDescription = async () => {
  const payload = await getPayloadHMR({ config })

  const data = await payload.findGlobal({
    slug: 'seo-properties',
  })

  const description = data.metaDescription

  return description
}
