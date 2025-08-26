'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import posthog from 'posthog-js'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== 'undefined') {
      posthog.capture('$pageview')
    }
  }, [pathname])

  return <>{children}</>
}