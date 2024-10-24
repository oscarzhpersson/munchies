import { getPayloadHMR } from '@payloadcms/next/utilities'

import type { DeliveryTime } from '@/interfaces/cms/delivery-time'

import config from '@payload-config'

/**
 * Fetches the delivery time ranges configuration from the CMS.
 *
 * @returns {Promise<DeliveryTime | null>} A promise that resolves to the delivery time ranges, or null if an error occurs.
 */
export const fetchDeliveryTimeRanges = async () => {
  try {
    const payload = await getPayloadHMR({ config })

    const ranges = await payload.findGlobal({
      slug: 'delivery-time-ranges',
    })

    if (!ranges) {
      throw new Error('DeliveryTimeRanges global config not found.')
    }

    const deliveryTimeRanges: DeliveryTime = {
      ranges:
        ranges.ranges?.map((range: any) => ({
          lower: range.lower,
          upper: range.upper,
          label: range.label,
        })) ?? null,
      upperFallback: ranges.upperFallback,
      lowerFallback: ranges.lowerFallback,
    }

    if (deliveryTimeRanges.ranges) {
      deliveryTimeRanges.ranges.sort((a, b) => a.lower - b.lower || a.upper - b.upper)
    }

    return deliveryTimeRanges
  } catch (error) {
    console.error('Error fetching DeliveryTimeRanges:', error)
    return null
  }
}
