'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getPostHog } from '@/lib/posthog'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const posthog = getPostHog()
    if (!posthog) return

    // Track page views on route changes
    posthog.capture('$pageview')
  }, [pathname])

  return <>{children}</>
}