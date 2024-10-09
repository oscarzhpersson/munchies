import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
}
