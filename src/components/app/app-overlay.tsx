'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import type { Overlay } from '@/interfaces/cms/overlay'

export interface AppOverlayProps {
  className?: string
  overlay: Overlay | null
}

export function AppOverlay({ className, overlay }: AppOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenOverlay = localStorage.getItem('hasSeenOverlay')

    if (!hasSeenOverlay) {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  const closeOverlay = () => {
    setIsVisible(false)
    localStorage.setItem('hasSeenOverlay', 'true')
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 py-11 px-8 bg-green text-white w-full h-full
                    flex flex-col items-start justify-between ${className}`}
    >
      {overlay?.logo ? (
        <Image src={overlay.logo.url} alt="logo" width={167} height={24} className="mt-2" />
      ) : (
        <div className="w-[167px] h-6 mt-2">logo</div>
      )}
      <div className="space-y-2 w-[15.375rem]">
        <h2 className="font-sf-pro font-[760] text-5xl leading-[3rem] tracking-[-0.063rem]">
          {overlay?.title ? overlay.title : 'title'}
        </h2>
        <p className="text-sm font-normal tracking-[-0.031rem] leading-[1.313rem] text-white">
          {overlay?.description ? overlay.description : 'description'}
        </p>
      </div>
      <button
        onClick={closeOverlay}
        className="w-full rounded-lg border-0.6 border-white p-4
                        hover:scale-95 transition-transform duration-50 ease-in-out"
      >
        <p className="font-bold text-base leading-4 tracking-[-0.5px]">
          {overlay?.buttonText ? overlay.buttonText : 'close'}
        </p>
      </button>
    </div>
  )
}
