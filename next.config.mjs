import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://work-test-web-2024-eze6j4scpq-lz.a.run.app/'],
  },
  experimental: {
    reactCompiler: false,
  },
}

export default withPayload(nextConfig)
