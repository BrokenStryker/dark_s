# PostHog Integration

PostHog has been successfully installed and configured for this Next.js application.

## Configuration

### Environment Variables
The following environment variables are configured in `.env.local`:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_OpUXHVAgNQvmC0V2HZ5OHxI99qeJcFyFfFlCm9D7OHO
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## File Structure

```
lib/
  posthog.ts              # PostHog initialization and configuration
hooks/
  use-posthog.ts          # Custom hook for easy PostHog usage
components/
  providers/
    PostHogProvider.tsx   # Provider component that wraps the app
```

## Usage

### Basic Tracking

Use the `usePostHog` hook in any component:

```tsx
import { usePostHog } from '@/hooks/use-posthog';

function MyComponent() {
  const { track, identify, reset, isLoaded } = usePostHog();
  
  const handleButtonClick = () => {
    track('button_clicked', {
      button_name: 'subscribe',
      location: 'header'
    });
  };
  
  return <button onClick={handleButtonClick}>Subscribe</button>;
}
```

### Available Methods

- `track(event, properties)` - Track custom events
- `identify(distinctId, properties)` - Identify users
- `reset()` - Reset user session
- `isLoaded` - Check if PostHog is loaded

## Features Enabled

- ✅ Automatic page view tracking
- ✅ Environment-based configuration
- ✅ TypeScript support
- ✅ SSR-safe initialization
- ✅ Development logging

## Example Implementation

An example tracking event has been added to the ContactSection component that tracks when users click "Get Directions":

```tsx
const handleGetDirectionsClick = () => {
  track('get_directions_clicked', {
    location: 'Sola Salon Studios',
    address: '1895 South Rd, Studio 25 Poughkeepsie, NY 12601'
  });
};
```

## Development

In development mode, PostHog will log when it's loaded. Check the browser console for the "PostHog loaded" message.

## Production

The integration is production-ready and will automatically track page views and any custom events you implement using the provided hooks and methods.