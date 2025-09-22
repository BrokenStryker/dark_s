"use client"

import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/ui/star-rating"
import { SectionContainer } from "@/components/ui/section-container"
import { ContentCard } from "@/components/ui/content-card"
import { SectionTitle, BodyText } from "@/components/ui/typography"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { staticReviews } from "@/lib/static-reviews"
import { SPACING, TYPOGRAPHY, COMPONENTS } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import { User, Quote } from "lucide-react"

export default function ReviewSection() {

  return (
    <SectionContainer id="reviews">
      <ContentCard variant="section">
        <div className={SPACING.contentGap}>
          {/* Header Section */}
          <div className="text-center">
            <SectionTitle
              className={cn(
                SPACING.marginBottom.sm,
                TYPOGRAPHY.fontLight,
                "text-foreground"
              )}
            >
              Client Reviews
            </SectionTitle>
            <BodyText muted className={SPACING.marginBottom.lg}>
              Discover what our clients say about their experiences at Dark Serenity.
            </BodyText>
          </div>

          {/* Reviews Carousel */}
          {filteredReviews.length === 0 ? (
            <Card className={cn(COMPONENTS.luxuryCard, "bg-card/50")}>
              <CardContent className="text-center py-12">
                <Quote className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <BodyText muted>
                  No reviews for {selectedService} yet
                </BodyText>
              </CardContent>
            </Card>
          ) : (
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {filteredReviews.map((review) => (
                    <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className={cn(COMPONENTS.luxuryCard, "bg-card/50 h-full")}>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Header with Name and Rating */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium text-sm">{review.customerName}</span>
                              </div>
                              <StarRating rating={review.rating} readonly size="sm" />
                            </div>

                            {/* Service Type */}
                            <div className="text-xs text-muted-foreground border-l-2 border-muted pl-2">
                              {review.serviceType}
                            </div>

                            {/* Review Text */}
                            <div className="relative">
                              <Quote className="w-4 h-4 text-muted-foreground/30 absolute -top-1 -left-1" />
                              <p className="text-sm leading-relaxed pl-3">{review.reviewText}</p>
                            </div>

                            {/* Date */}
                            <div className="text-xs text-muted-foreground pt-2 border-t">
                              {new Date(review.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {filteredReviews.length > 3 && (
                  <>
                    <CarouselPrevious className="-left-8" />
                    <CarouselNext className="-right-8" />
                  </>
                )}
              </Carousel>
            </div>
          )}
        </div>
      </ContentCard>
    </SectionContainer>
  )
}