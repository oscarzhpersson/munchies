import React from 'react'

import { fetchMetaDescription } from '@/services/cms/fetchSeoProperties'

import './globals.css'

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  let metaDescription

  try {
    metaDescription = await fetchMetaDescription()
  } catch (err) {
    console.error('Error fetching meta description:', err)
    metaDescription = 'Munchies - Your go-to spot for great food choices!'
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/munchies-favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon/munchies-favicon.png" sizes="40x40" />
        <meta name="description" content={metaDescription} />
        <title>Munchies - Eat better! No, seriously.</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default Layout
