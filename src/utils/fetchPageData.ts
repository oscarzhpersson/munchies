import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Page } from '@/interfaces/page'

import config from '@payload-config'

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
