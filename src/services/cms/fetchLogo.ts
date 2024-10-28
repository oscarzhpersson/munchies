import config from '@payload-config'

import { getPayloadHMR } from '@payloadcms/next/utilities'

import type { Logo } from '@/interfaces/cms/logo'

/**
 * Fetches the logo URL from the site settings.
 *
 * @returns {Promise<string>} A promise that resolves to the logo URL.
 * @throws Will throw an error if the logo is not found.
 */
export const fetchLogo = async () => {
  try {
    const payload = await getPayloadHMR({ config })

    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })

    if (!siteSettings) {
      throw new Error('No site settings found')
    }

    if (!siteSettings.logo) {
      throw new Error('No logo found in site settings')
    }

    const logoUrl = (siteSettings.logo as Logo).url

    return logoUrl
  } catch (err) {
    throw new Error((err as Error).message)
  }
}
