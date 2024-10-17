import React from 'react'

import './globals.css'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/munchies-favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon/munchies-favicon.png" sizes="40x40" />
        <title>Munchies - Eat better! No, seriously.</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default Layout
