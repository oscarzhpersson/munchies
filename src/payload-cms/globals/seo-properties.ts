import { GlobalConfig } from 'payload'

export const SeoProperties: GlobalConfig = {
  slug: 'seo-properties',
  fields: [
    {
      name: 'metaDescription',
      label: 'Meta description',
      type: 'text',
      required: true,
    },
  ],
}
