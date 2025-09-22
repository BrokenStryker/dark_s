import React from "react";
import { Service } from "@/components/ui/service-card";
import { SectionTitle, BodyText } from "@/components/ui/typography";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useImageCarousel } from "@/hooks/use-image-carousel";
import { SPACING, COMPONENTS } from "@/lib/design-tokens";
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

interface ServiceAccordionItemProps {
  service: Service;
  index: number;
}

function ServiceAccordionItem({ service, index }: ServiceAccordionItemProps) {
  const { currentIndex, goToNext, goToPrevious, goToIndex } = useImageCarousel(service.images.length);

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Check if this service has dynamic content
  const isDynamic = service.names && service.prices && service.descriptions;

  // Get current content based on carousel position
  const currentName = isDynamic ? service.names![currentIndex] : service.name;
  const currentPrice = isDynamic ? service.prices![currentIndex] : service.price;
  const currentDescription = isDynamic ? service.descriptions![currentIndex] : service.description;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23666'%3E${currentName}%3C/text%3E%3C/svg%3E`;
  };

  return (
    <AccordionItem value={`service-${index}`}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center justify-between w-full mr-4">
          <h4 className="text-lg font-medium text-left">{service.name}</h4>
          <Badge
            variant="secondary"
            className="bg-primary/20 text-primary px-3 py-1 text-lg font-medium"
          >
            {service.price}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-6">
          {/* Service Description */}
          <BodyText className="leading-relaxed">
            {currentDescription}
          </BodyText>

          {/* Image Carousel */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div
                className="flex overflow-hidden cursor-pointer"
                onClick={goToNext}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * 78}%)`,
                    width: `${service.images.length * 78}%`
                  }}
                >
                  {service.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative flex-shrink-0 w-[78%] aspect-[4/5] rounded-3xl overflow-hidden bg-muted/10 mr-4"
                    >
                      <Image
                        src={image}
                        alt={`${currentName} - Image ${imageIndex + 1}`}
                        fill
                        className="object-cover rounded-3xl"
                        onError={handleImageError}
                      />
                      {imageIndex !== currentIndex && (
                        <div className="absolute inset-0 bg-black/30 rounded-3xl" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Indicators */}
              {service.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {service.images.map((_, imageIndex) => (
                    <button
                      key={imageIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToIndex(imageIndex);
                      }}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        currentIndex === imageIndex ? 'bg-white' : 'bg-white/50'
                      )}
                      aria-label={`Go to image ${imageIndex + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function ServiceCategorySection({ category, className }: ServiceCategoryProps) {
  return (
    <div className={className}>
      {/* Category Header */}
      <div className={cn("text-center", SPACING.marginBottom.md)}>
        <SectionTitle
          as="h3"
          className={cn(SPACING.marginBottom.sm, "section-title", "text-2xl sm:text-3xl md:text-4xl lg:text-5xl")}
        >
          {category.title}
        </SectionTitle>
        {category.description && (
          <BodyText muted className="max-w-3xl mx-auto">
            {category.description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < category.description.split('\n').length - 1 && <br />}
              </span>
            ))}
          </BodyText>
        )}
      </div>

      {/* Services Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {category.services.map((service, serviceIndex) => (
          <ServiceAccordionItem
            key={`${category.title}-${serviceIndex}`}
            service={service}
            index={serviceIndex}
          />
        ))}
      </Accordion>
    </div>
  );
}