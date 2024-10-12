import React from 'react'

import './globals.css'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

export default Layout
