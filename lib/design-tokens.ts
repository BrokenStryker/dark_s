/**
 * Design Tokens for Dark Serenity Website
 * Centralized styling constants for maintainable theming
 */

export const SPACING = {
  // Section spacing (removed vertical padding - now controlled in page.tsx)
  section: '',
  sectionSmall: '',
  sectionLarge: '',
  
  // Card padding (appropriate for mobile)
  cardPadding: 'p-4 sm:p-8',
  cardPaddingSmall: 'p-3 sm:p-6',
  cardPaddingLarge: 'p-6 sm:p-10',
  
  // Content gaps
  contentGap: 'space-y-8',
  contentGapLarge: 'space-y-12',
  contentGapSmall: 'space-y-6',
  contentGapXSmall: 'space-y-4',
  
  // Margins
  marginBottom: {
    xs: 'mb-2',
    sm: 'mb-4',
    md: 'mb-6',
    lg: 'mb-8',
    xl: 'mb-12',
    xxl: 'mb-16'
  }
} as const;

export const TYPOGRAPHY = {
  // Heading sizes (responsive)
  heroTitle: 'text-4xl md:text-6xl lg:text-7xl',
  sectionTitle: 'text-3xl md:text-4xl lg:text-5xl',
  cardTitle: 'text-xl md:text-2xl',
  subTitle: 'text-lg md:text-xl',
  
  // Body text sizes
  bodyLarge: 'text-lg',
  bodyMedium: 'text-base',
  bodySmall: 'text-sm',
  
  // Font weights
  fontLight: 'font-light',
  fontNormal: 'font-normal',
  fontMedium: 'font-medium',
  fontSemibold: 'font-semibold',
  fontBold: 'font-bold',
  
  // Font families
  fontTrajan: 'font-trajan',
  fontFutura: 'font-futura'
} as const;

export const LAYOUT = {
  // Max widths
  maxWidth: 'max-w-6xl mx-auto',
  maxWidthNarrow: 'max-w-4xl mx-auto',
  maxWidthWide: 'max-w-7xl mx-auto',
  maxWidthFull: 'max-w-full mx-auto',
  
  // Padding (no padding on mobile for full width, add padding on larger screens)
  padding: 'px-0 sm:px-4',
  paddingLarge: 'px-0 sm:px-6 lg:px-8',
  
  // Grid layouts (single column on mobile)
  grid2Col: 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12',
  grid3Col: 'grid md:grid-cols-3 gap-8',
  grid4Col: 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6',
  
  // Flexbox patterns
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  flexRow: 'flex flex-row'
} as const;

export const COLORS = {
  // Section background colors
  sectionBg: '#e4e1dd',
  cardBg: '#c8c2bb',
  
  // CSS custom property equivalents
  sectionBgRgb: '228, 225, 221', // RGB values for #e4e1dd
  cardBgRgb: '200, 194, 187'     // RGB values for #c8c2bb
} as const;

export const COMPONENTS = {
  // Card variants with new colors (rounded corners on all devices)
  luxuryCard: `backdrop-blur-sm rounded-lg border`,
  simpleCard: `rounded-lg border`,
  glassCard: `backdrop-blur-md rounded-lg border`,
  
  // Section specific styles (no rounded corners or borders on mobile for full width)
  sectionCard: `rounded-none sm:rounded-lg border-0 sm:border`,
  
  // Button variants
  primaryButton: 'bg-primary hover:bg-primary/90 text-primary-foreground',
  secondaryButton: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
  outlineButton: 'border border-border hover:bg-muted',
  
  // Navigation
  navBar: 'fixed top-0 w-full z-50 bg-card/90 backdrop-blur-md border-b border-border',
  
  // Transitions
  transition: 'transition-colors duration-200',
  transitionAll: 'transition-all duration-300 ease-in-out',
  hoverScale: 'hover:scale-105 transform transition-transform duration-200'
} as const;

export const RESPONSIVE = {
  // Breakpoint utilities
  mobile: 'sm:',
  tablet: 'md:',
  desktop: 'lg:',
  wide: 'xl:',
  ultraWide: '2xl:',
  
  // Common responsive patterns
  textCenter: 'text-center lg:text-left',
  textCenterMobile: 'text-center sm:text-left',
  hideMobile: 'hidden sm:block',
  showMobile: 'block sm:hidden',
  
  // Image responsive patterns
  imageContain: 'object-contain',
  imageCover: 'object-cover',
  imageCenter: 'object-center'
} as const;

// Utility function to combine design tokens
export function combineTokens(...tokens: string[]): string {
  return tokens.join(' ');
}

// Utility function to create responsive variants
export function createResponsiveVariant(base: string, variants: Record<string, string>): string {
  const responsiveClasses = Object.entries(variants)
    .map(([breakpoint, value]) => `${breakpoint}${value}`)
    .join(' ');
  
  return `${base} ${responsiveClasses}`;
}

// Common component class combinations
export const COMMON_CLASSES = {
  sectionContainer: combineTokens(SPACING.section, LAYOUT.padding),
  sectionContent: combineTokens(LAYOUT.maxWidth, SPACING.contentGap),
  cardContainer: combineTokens(COMPONENTS.luxuryCard, SPACING.cardPadding),
  sectionTitle: combineTokens(TYPOGRAPHY.sectionTitle, TYPOGRAPHY.fontTrajan, TYPOGRAPHY.fontBold),
  cardTitle: combineTokens(TYPOGRAPHY.cardTitle, TYPOGRAPHY.fontTrajan, TYPOGRAPHY.fontSemibold),
  bodyText: combineTokens(TYPOGRAPHY.bodyLarge, TYPOGRAPHY.fontFutura),
  button: combineTokens(COMPONENTS.primaryButton, TYPOGRAPHY.fontFutura, COMPONENTS.transition)
} as const;