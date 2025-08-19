"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceName, BodyText } from "@/components/ui/typography";
import { useImageCarousel } from "@/hooks/use-image-carousel";
import { SPACING, COMPONENTS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export interface Service {
  name: string;
  price: string;
  description: string;
  images: string[];
  // Dynamic content arrays for carousel-based services (optional)
  names?: string[];
  prices?: string[];
  descriptions?: string[];
}

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const { currentIndex, goToNext, goToPrevious, goToIndex } = useImageCarousel(service.images.length);

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
    <div className={cn("bg-transparent", SPACING.cardPaddingSmall, className)}>
      <div className={SPACING.contentGap}>
        {/* Image Carousel - Middle (full width on mobile) */}
        <div className="flex justify-center -mx-6 sm:mx-0">
          <div className="relative w-full sm:max-w-md">
            {/* Service Name and Price - Above the image */}
            <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
              <div className="flex-1 text-center">
                <ServiceName>{currentName}</ServiceName>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-primary/20 text-primary text-lg px-3 py-1 font-futura ml-2"
              >
                {currentPrice}
              </Badge>
            </div>
            
            <div className="relative bg-muted/10 rounded-none sm:rounded-3xl overflow-hidden aspect-[4/5]">
              <Image
                key={`${currentName}-${currentIndex}`}
                src={service.images[currentIndex]}
                alt={`${currentName} - Image ${currentIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-300 rounded-none sm:rounded-3xl"
                onError={handleImageError}
              />
            </div>
            
            {/* Carousel Navigation */}
            {service.images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className={cn(
                    "absolute left-2 top-1/2 transform -translate-y-1/2",
                    "bg-black/70 hover:bg-black/90 text-white rounded-full p-2",
                    COMPONENTS.transition,
                    "z-20"
                  )}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <button
                  onClick={goToNext}
                  className={cn(
                    "absolute right-2 top-1/2 transform -translate-y-1/2",
                    "bg-black/70 hover:bg-black/90 text-white rounded-full p-2",
                    COMPONENTS.transition,
                    "z-20"
                  )}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {service.images.map((_, imageIndex) => (
                    <button
                      key={imageIndex}
                      onClick={() => goToIndex(imageIndex)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        currentIndex === imageIndex ? 'bg-white' : 'bg-white/50'
                      )}
                      aria-label={`Go to image ${imageIndex + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Service Description - Below carousel */}
        <div className="text-center">
          <BodyText className="leading-relaxed">
            {currentDescription}
          </BodyText>
        </div>
      </div>
    </div>
  );
}