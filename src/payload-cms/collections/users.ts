import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    delete: () => true,
    update: () => true,
  },
  fields: [],
}
