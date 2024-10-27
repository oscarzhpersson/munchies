'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // TODO: Log error to error tracking service, datadog.
    console.error('An error has occurred: ', error)
  }, [error])

  return (
    <div className="w-full h-screen bg-offWhite flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 select-none">
        <p className="text-display">Sorry, something went wrong.</p>
        <p className="text-h1">Please reload the page and try again.</p>
      </div>
    </div>
  )
}
