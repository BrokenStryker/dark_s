import { ServiceCard, Service } from "@/components/ui/service-card";
import { SectionTitle, BodyText } from "@/components/ui/typography";
import { SPACING, LAYOUT } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export interface ServiceCategory {
  title: string;
  description: string;
  services: Service[];
}

interface ServiceCategoryProps {
  category: ServiceCategory;
  className?: string;
}

export function ServiceCategorySection({ category, className }: ServiceCategoryProps) {
  return (
    <div className={className}>
      {/* Category Header */}
      <div className={cn("text-center", SPACING.marginBottom.xl)}>
        <SectionTitle 
          as="h3"
          className={cn(SPACING.marginBottom.sm, "section-title")}
        >
          {category.title}
        </SectionTitle>
        {category.description && (
          <BodyText muted className="max-w-3xl mx-auto">
            {category.description}
          </BodyText>
        )}
      </div>
      
      {/* Services Grid */}
      <div className={category.services.length === 1 ? "flex justify-center" : LAYOUT.grid2Col}>
        {category.services.map((service, serviceIndex) => (
          <ServiceCard
            key={`${category.title}-${serviceIndex}`}
            service={service}
            className={category.services.length === 1 ? "max-w-md" : ""}
          />
        ))}
      </div>
    </div>
  );
}