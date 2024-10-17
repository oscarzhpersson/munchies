import { GlobalConfig } from 'payload'

export const DeliveryTimeRanges: GlobalConfig = {
  slug: 'delivery-time-ranges',
  label: 'Delivery Time Ranges',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'ranges',
      type: 'array',
      label: 'Delivery Time Ranges',
      fields: [
        {
          name: 'lower',
          type: 'number',
          label: 'Lower Bound Time (in minutes)',
          required: true,
        },
        {
          name: 'upper',
          type: 'number',
          label: 'Upper Bound Time (in minutes)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          admin: {
            placeholder: 'E.g. 20-25 min',
          },
        },
      ],
    },
    {
      name: 'upperFallback',
      type: 'text',
      label: 'Fallback Upper Bound Time (in minutes)',
      defaultValue: '1 hour+',
      required: true,
    },
    {
      name: 'lowerFallback',
      type: 'text',
      label: 'Fallback Lower Bound Time (in minutes)',
      defaultValue: 'Instant',
      required: true,
    },
  ],
}
