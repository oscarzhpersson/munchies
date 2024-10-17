import config from '@payload-config'

import { getPayloadHMR } from '@payloadcms/next/utilities'

import type { Logo } from '@/interfaces/logo'

export const fetchLogo = async () => {
  const payload = await getPayloadHMR({ config })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const logoUrl = (siteSettings.logo as Logo).url

  return logoUrl
}
