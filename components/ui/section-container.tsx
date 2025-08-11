import { cn } from "@/lib/utils";
import { SPACING, LAYOUT, COMMON_CLASSES } from "@/lib/design-tokens";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  width?: 'narrow' | 'default' | 'wide' | 'full';
  spacing?: 'small' | 'default' | 'large';
}

export function SectionContainer({ 
  children, 
  className,
  id,
  width = 'default',
  spacing = 'default'
}: SectionContainerProps) {
  const widthClasses = {
    narrow: LAYOUT.maxWidthNarrow,
    default: LAYOUT.maxWidth,
    wide: LAYOUT.maxWidthWide,
    full: LAYOUT.maxWidthFull
  };

  const spacingClasses = {
    small: SPACING.sectionSmall,
    default: SPACING.section,
    large: SPACING.sectionLarge
  };

  return (
    <section 
      id={id}
      className={cn(
        spacingClasses[spacing],
        LAYOUT.padding,
        className
      )}
    >
      <div className={cn(widthClasses[width])}>
        {children}
      </div>
    </section>
  );
}