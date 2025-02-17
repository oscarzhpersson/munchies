import path from 'path'
import sharp from 'sharp'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from 'payload/i18n/en'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from '@/payload-cms/collections/users'
import { Pages } from '@/payload-cms/collections/pages'
import { Media } from '@/payload-cms/collections/media'
import { SiteSettings } from '@/payload-cms/globals/site-settings'
import { DeliveryTimeRanges } from '@/payload-cms/globals/delivery-time-ranges'
import { OverlayContent } from '@/payload-cms/globals/overlay-content'
import { SeoProperties } from '@/payload-cms/globals/seo-properties'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Pages, Media],
  globals: [SiteSettings, DeliveryTimeRanges, OverlayContent, SeoProperties],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),

  i18n: {
    supportedLanguages: { en },
  },
  plugins: process.env.BLOB_READ_WRITE_TOKEN
    ? [
        vercelBlobStorage({
          collections: {
            [Media.slug]: true,
          },
          token: process.env.BLOB_READ_WRITE_TOKEN || '',
        }),
      ]
    : [],
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'dev@payloadcms.com',
          password: 'default',
        },
      })
    }
  },
  sharp,
})
