import { cn } from "@/lib/utils";
import { TYPOGRAPHY, COMMON_CLASSES } from "@/lib/design-tokens";

// Section Title Component
interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionTitle({ children, className, as: Component = 'h2' }: SectionTitleProps) {
  return (
    <Component className={cn(
      TYPOGRAPHY.sectionTitle,
      TYPOGRAPHY.fontFutura,
      TYPOGRAPHY.fontBold,
      className
    )}>
      {children}
    </Component>
  );
}

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component className={cn(COMMON_CLASSES.cardTitle, className)}>
      {children}
    </Component>
  );
}

// Body Text Component
interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  as?: 'p' | 'span' | 'div';
  muted?: boolean;
}

export function BodyText({ 
  children, 
  className, 
  size = 'large',
  as: Component = 'p',
  muted = false 
}: BodyTextProps) {
  const sizeClasses = {
    small: TYPOGRAPHY.bodySmall,
    medium: TYPOGRAPHY.bodyMedium,
    large: TYPOGRAPHY.bodyLarge
  };

  return (
    <Component 
      className={cn(
        sizeClasses[size],
        TYPOGRAPHY.fontFutura,
        muted && 'text-muted-foreground',
        className
      )}
    >
      {children}
    </Component>
  );
}

// Hero Title Component
interface HeroTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroTitle({ children, className }: HeroTitleProps) {
  return (
    <h1 
      className={cn(
        TYPOGRAPHY.heroTitle,
        TYPOGRAPHY.fontTrajan,
        TYPOGRAPHY.fontBold,
        className
      )}
    >
      {children}
    </h1>
  );
}

// Subtitle Component
interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}

export function SubTitle({ children, className, muted = true }: SubTitleProps) {
  return (
    <p 
      className={cn(
        TYPOGRAPHY.subTitle,
        TYPOGRAPHY.fontTrajan,
        muted && 'text-muted-foreground',
        className
      )}
    >
      {children}
    </p>
  );
}

// Service Name Component (special typography for services)
interface ServiceNameProps {
  children: React.ReactNode;
  className?: string;
}

export function ServiceName({ children, className }: ServiceNameProps) {
  return (
    <h4 
      className={cn(
        TYPOGRAPHY.cardTitle,
        TYPOGRAPHY.fontTrajan,
        'service-name', // Keep existing CSS class for consistency
        className
      )}
    >
      {children}
    </h4>
  );
}

// Owner Name Component (special typography for owner section)
interface OwnerNameProps {
  children: React.ReactNode;
  className?: string;
}

export function OwnerName({ children, className }: OwnerNameProps) {
  return (
    <h2 
      className={cn(
        TYPOGRAPHY.sectionTitle,
        TYPOGRAPHY.fontTrajan,
        TYPOGRAPHY.fontBold,
        'owner-name', // Keep existing CSS class for consistency
        className
      )}
    >
      {children}
    </h2>
  );
}