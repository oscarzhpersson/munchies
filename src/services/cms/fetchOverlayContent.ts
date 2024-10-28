import config from '@payload-config'

import { getPayloadHMR } from '@payloadcms/next/utilities'

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
  try {
    const payload = await getPayloadHMR({ config })

    const overlayContent = await payload.findGlobal({
      slug: 'overlay-content',
    })

    if (!overlayContent) {
      throw new Error('Overlay content not found.')
    }

    return overlayContent as Overlay
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred fetching overlay content'
    throw new Error(errorMessage)
  }
}
