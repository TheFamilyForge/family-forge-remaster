'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ScrollReset() {
  const pathname = usePathname()

  // disable the browser’s built‑in restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  // on every route change, jump to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
