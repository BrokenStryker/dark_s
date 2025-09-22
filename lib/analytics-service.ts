/**
 * Centralized Analytics Service for Dark Serenity Hair Salon
 * Provides consistent tracking patterns across all components
 */

// Track different types of user interactions
export interface TrackingEvent {
  event: string;
  properties: Record<string, any>;
}

export interface ButtonClickProperties {
  button_location: string;
  button_type: string;
  url?: string;
  timestamp: string;
}

export interface NavigationProperties {
  section: string;
  method: 'click' | 'scroll';
  timestamp: string;
}

export interface PageViewProperties {
  page: string;
  referrer?: string;
  timestamp: string;
}

/**
 * Centralized analytics service that standardizes all tracking calls
 * This replaces individual tracking functions scattered across components
 */
export class AnalyticsService {
  /**
   * Track button clicks with standardized naming convention
   * @param buttonType - Type of button (e.g., 'book_now', 'personal_instagram', 'salon_instagram')
   * @param location - Where the button is located (e.g., 'header', 'hero', 'mobile_sticky_bottom')
   * @param url - Optional URL if button is a link
   * @param track - PostHog track function
   */
  static trackButtonClick(
    buttonType: string,
    location: string,
    track: (event: string, properties?: Record<string, any>) => void,
    url?: string
  ): void {
    const eventName = `${location}_${buttonType}_clicked`;
    const properties: ButtonClickProperties = {
      button_location: location,
      button_type: buttonType,
      timestamp: new Date().toISOString(),
      ...(url && { url })
    };

    track(eventName, properties);
  }

  /**
   * Track navigation events
   * @param section - Section being navigated to
   * @param method - How navigation occurred
   * @param track - PostHog track function
   */
  static trackNavigation(
    section: string,
    method: 'click' | 'scroll',
    track: (event: string, properties?: Record<string, any>) => void
  ): void {
    const eventName = `navigation_${section}`;
    const properties: NavigationProperties = {
      section,
      method,
      timestamp: new Date().toISOString()
    };

    track(eventName, properties);
  }

  /**
   * Track page views and section loads
   * @param page - Page or section name
   * @param track - PostHog track function
   * @param referrer - Optional referrer information
   */
  static trackPageView(
    page: string,
    track: (event: string, properties?: Record<string, any>) => void,
    referrer?: string
  ): void {
    const eventName = `${page}_loaded`;
    const properties: PageViewProperties = {
      page,
      timestamp: new Date().toISOString(),
      ...(referrer && { referrer })
    };

    track(eventName, properties);
  }

  /**
   * Track form submissions
   * @param formType - Type of form (e.g., 'contact', 'booking', 'newsletter')
   * @param track - PostHog track function
   * @param formData - Optional form data (be careful not to include PII)
   */
  static trackFormSubmission(
    formType: string,
    track: (event: string, properties?: Record<string, any>) => void,
    formData?: Record<string, any>
  ): void {
    const eventName = `${formType}_form_submitted`;
    const properties = {
      form_type: formType,
      timestamp: new Date().toISOString(),
      ...formData
    };

    track(eventName, properties);
  }

  /**
   * Track carousel/image interactions
   * @param carouselType - Type of carousel (e.g., 'reviews', 'services')
   * @param action - Action taken (e.g., 'swipe', 'click', 'indicator_click')
   * @param track - PostHog track function
   * @param metadata - Optional metadata about the interaction
   */
  static trackCarouselInteraction(
    carouselType: string,
    action: string,
    track: (event: string, properties?: Record<string, any>) => void,
    metadata?: Record<string, any>
  ): void {
    const eventName = `${carouselType}_carousel_${action}`;
    const properties = {
      carousel_type: carouselType,
      action,
      timestamp: new Date().toISOString(),
      ...metadata
    };

    track(eventName, properties);
  }

  /**
   * Track external link clicks (social media, booking platforms, etc.)
   * @param linkType - Type of external link
   * @param destination - Where the link goes
   * @param track - PostHog track function
   */
  static trackExternalLink(
    linkType: string,
    destination: string,
    track: (event: string, properties?: Record<string, any>) => void
  ): void {
    const eventName = `external_link_${linkType}_clicked`;
    const properties = {
      link_type: linkType,
      destination,
      timestamp: new Date().toISOString()
    };

    track(eventName, properties);
  }
}

// Convenience functions for common tracking patterns
export const createTrackingHandler = (
  trackingFunction: () => void
) => {
  return () => {
    try {
      trackingFunction();
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  };
};

// Export types for use in components
export type {
  TrackingEvent,
  ButtonClickProperties,
  NavigationProperties,
  PageViewProperties
};