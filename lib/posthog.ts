import { PostHog } from 'posthog-js'

let posthog: PostHog | null = null

export const getPostHog = (): PostHog | null => {
  if (typeof window === 'undefined') {
    return null
  }

  if (!posthog) {
    const { posthog: posthogLib } = require('posthog-js')
    
    posthogLib.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      loaded: (posthog: PostHog) => {
        if (process.env.NODE_ENV === 'development') console.log('PostHog loaded')
      }
    })
    
    posthog = posthogLib
  }

  return posthog
}