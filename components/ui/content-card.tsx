import { cn } from "@/lib/utils";
import { SPACING, COMPONENTS, COLORS } from "@/lib/design-tokens";

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'luxury' | 'simple' | 'glass' | 'section';
  padding?: 'small' | 'default' | 'large';
}

export function ContentCard({ 
  children, 
  className,
  variant = 'luxury',
  padding = 'default'
}: ContentCardProps) {
  const variantClasses = {
    luxury: COMPONENTS.luxuryCard,
    simple: COMPONENTS.simpleCard,
    glass: COMPONENTS.glassCard,
    section: COMPONENTS.sectionCard
  };

  const paddingClasses = {
    small: SPACING.cardPaddingSmall,
    default: SPACING.cardPadding,
    large: SPACING.cardPaddingLarge
  };

  // Apply background colors based on variant (removed section background for seamless transitions)
  const backgroundStyle = variant === 'section'
    ? {}
    : { backgroundColor: COLORS.cardBg };

  return (
    <div 
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      style={backgroundStyle}
    >
      {children}
    </div>
  );
}