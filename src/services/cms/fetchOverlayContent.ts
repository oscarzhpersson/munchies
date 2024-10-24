import config from '@payload-config'

import { getPayloadHMR } from '@payloadcms/next/utilities'

import type { Logo } from '@/interfaces/cms/logo'
import type { Overlay } from '@/interfaces/cms/overlay'

/**
 * Fetches the overlay content from the Payload CMS.
 *
 * @async
 * @function fetchOverlayContent
 * @returns {Promise<Overlay>} A promise that resolves to the overlay content object.
 * @throws {Error} If fetching the overlay content fails or the slug is not found.
 */
export const fetchOverlayContent = async (): Promise<Overlay> => {
  const payload = await getPayloadHMR({ config })

  const overlayContent = await payload.findGlobal({
    slug: 'overlay-content',
  })

  return overlayContent as Overlay
}
