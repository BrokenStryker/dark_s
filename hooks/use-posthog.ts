import posthog from 'posthog-js'

export const usePostHog = () => {
  const track = (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture(event, properties)
    }
  }

  const identify = (distinctId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.identify(distinctId, properties)
    }
  }

  const reset = () => {
    if (typeof window !== 'undefined') {
      posthog.reset()
    }
  }

  return {
    track,
    identify,
    reset,
    isLoaded: typeof window !== 'undefined'
  }
}