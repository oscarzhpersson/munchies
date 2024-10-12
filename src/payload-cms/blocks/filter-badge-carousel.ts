import { Block } from 'payload'

export const FilterBadgeCarousel: Block = {
  slug: 'filter-badge-carousel',
  labels: {
    singular: 'Filter Badge Carousel',
    plural: 'Filter Badge Carousels',
  },
  fields: [
    {
      name: 'badges',
      label: 'Badges',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'badge',
          label: 'Badge',
          type: 'group',
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
