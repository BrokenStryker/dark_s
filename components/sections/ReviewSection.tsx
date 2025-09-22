"use client"

import React from "react"
import Image from "next/image"
import { StarRating } from "@/components/ui/star-rating"
import { SectionContainer } from "@/components/ui/section-container"
import { ContentCard } from "@/components/ui/content-card"
import { SectionTitle, BodyText } from "@/components/ui/typography"
import { staticReviews } from "@/lib/static-reviews"
import { useSwipeableCarousel } from "@/hooks/use-swipeable-carousel"
import { SPACING, TYPOGRAPHY } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import { Quote, ArrowUpRight } from "lucide-react"

export default function ReviewSection() {
  const { currentIndex, goToNext, goToPrevious, goToIndex, touchHandlers } = useSwipeableCarousel({
    totalItems: staticReviews.length
  })
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const currentReview = staticReviews[currentIndex]

  // Auto-scroll selected name to flush left
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const buttonsContainer = container.querySelector('div') as HTMLElement

      if (buttonsContainer) {
        const selectedButton = buttonsContainer.children[currentIndex] as HTMLElement

        if (selectedButton) {
          const containerRect = container.getBoundingClientRect()
          const buttonRect = selectedButton.getBoundingClientRect()
          const containerPadding = 16 // px-4 = 16px padding
          const scrollLeft = container.scrollLeft + (buttonRect.left - containerRect.left) - containerPadding

          container.scrollTo({
            left: Math.max(0, scrollLeft),
            behavior: 'smooth'
          })
        }
      }
    }
  }, [currentIndex])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23666'%3E${currentReview.serviceType}%3C/text%3E%3C/svg%3E`
  }

  return (
    <SectionContainer id="reviews">
      <ContentCard variant="section">
        <div className={SPACING.contentGap}>
          {/* Header Section */}
          <div className="text-left mb-4">
            <SectionTitle
              className={cn(
                SPACING.marginBottom.sm,
                TYPOGRAPHY.fontLight,
                "text-foreground"
              )}
            >
              Word on the street
            </SectionTitle>
          </div>

          {/* Review Link - Flush Left */}
          <div className="text-left mb-2">
            <a
              href="https://g.page/r/CZNXAlFktbS1EAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-foreground underline transition-all duration-200 group"
            >
              Leave your own review
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Reviewer Names Navigation */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 min-w-max px-4 lg:justify-center lg:min-w-full">
              {staticReviews.map((review, index) => (
                <button
                  key={review.id}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    "transition-all duration-300 whitespace-nowrap pb-2",
                    index === currentIndex
                      ? "font-bold text-foreground text-lg border-b-2 border-foreground"
                      : "text-muted-foreground text-base hover:text-foreground/70 border-b-2 border-transparent"
                  )}
                >
                  {review.customerName}
                </button>
              ))}
            </div>
          </div>

          {/* Image Carousel with Review Overlay */}
          <div className="flex justify-center mb-32">
            <div className="relative w-full max-w-lg">
              <div
                className="flex overflow-hidden cursor-pointer"
                onClick={goToNext}
                {...touchHandlers}
              >
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * 78}%)`,
                    width: `${staticReviews.length * 78}%`
                  }}
                >
                  {staticReviews.map((review, reviewIndex) => (
                    <div
                      key={review.id}
                      className="relative flex-shrink-0 w-[78%] aspect-[4/5] rounded-3xl overflow-hidden bg-muted/10 mr-4"
                    >
                      <Image
                        src={review.image}
                        alt={`${review.customerName} - ${review.serviceType}`}
                        fill
                        className="object-cover rounded-3xl"
                        onError={handleImageError}
                      />
                      {reviewIndex !== currentIndex && (
                        <div className="absolute inset-0 bg-black/30 rounded-3xl" />
                      )}

                    </div>
                  ))}
                </div>
              </div>

              {/* Review Text Box - Overlapping the bottom of image */}
              <div
                className="absolute -bottom-32 left-0 right-0 mx-4"
                {...touchHandlers}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
                  <div className="space-y-4">
                    {/* Rating and Service Type */}
                    <div className="flex items-center justify-between">
                      <StarRating rating={currentReview.rating} readonly size="sm" />
                      <div className="text-sm text-muted-foreground font-medium">
                        {currentReview.serviceType}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="relative">
                      <Quote className="w-4 h-4 text-muted-foreground/30 absolute -top-1 -left-1" />
                      <p className="text-foreground text-sm leading-relaxed pl-5">
                        {currentReview.reviewText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Indicators */}
              {staticReviews.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                  {staticReviews.map((_, reviewIndex) => (
                    <button
                      key={reviewIndex}
                      onClick={(e) => {
                        e.stopPropagation()
                        goToIndex(reviewIndex)
                      }}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all duration-200 border-2",
                        currentIndex === reviewIndex
                          ? 'bg-white border-white scale-125'
                          : 'bg-transparent border-white/70 hover:border-white hover:scale-110'
                      )}
                      aria-label={`Go to review ${reviewIndex + 1}`}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </ContentCard>
    </SectionContainer>
  )
}