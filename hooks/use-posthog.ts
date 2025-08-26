import { getPostHog } from '@/lib/posthog'

export const usePostHog = () => {
  const posthog = getPostHog()

  const track = (event: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.capture(event, properties)
    }
  }

  const identify = (distinctId: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.identify(distinctId, properties)
    }
  }

  const reset = () => {
    if (posthog) {
      posthog.reset()
    }
  }

  return {
    track,
    identify,
    reset,
    isLoaded: !!posthog
  }
}