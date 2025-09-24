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
import { Quote, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react"

export default function ReviewSection() {
  const { currentIndex, goToNext, goToPrevious, goToIndex, touchHandlers } = useSwipeableCarousel({
    totalItems: staticReviews.length
  })
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [expandedReviews, setExpandedReviews] = React.useState<Set<number>>(new Set())

  const currentReview = staticReviews[currentIndex]

  // Toggle read more for a specific review
  const toggleReadMore = (reviewIndex: number) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev)
      if (newSet.has(reviewIndex)) {
        newSet.delete(reviewIndex)
      } else {
        newSet.add(reviewIndex)
      }
      return newSet
    })
  }

  // Truncate text to approximately 3 lines (about 150 characters)
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    const truncated = text.substring(0, maxLength)
    const lastSpace = truncated.lastIndexOf(' ')
    return lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated
  }

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
          <div className="text-left mb-1">
            <SectionTitle
              className={cn(
                TYPOGRAPHY.fontLight,
                "text-foreground"
              )}
            >
              Word on the street
            </SectionTitle>
          </div>

          {/* Review Link - Flush Left */}
          <div className="text-left mb-8">
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
            className="overflow-x-auto pb-2 scrollbar-hide mb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 min-w-max lg:justify-center lg:min-w-full">
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
          <div className="flex justify-center mb-40">
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
                className="absolute -bottom-32 left-4 right-4 z-20"
                {...touchHandlers}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-border max-w-full min-h-[180px] flex flex-col">
                  <div className="space-y-4 flex-1">
                    {/* Rating and Service Type */}
                    <div className="flex items-center justify-between">
                      <StarRating rating={currentReview.rating} readonly size="sm" />
                      <div className="text-sm text-muted-foreground font-medium">
                        {currentReview.serviceType}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="relative flex-1">
                      <Quote className="w-4 h-4 text-muted-foreground/30 absolute -top-1 -left-1 z-10" />
                      <div className="pl-5 relative z-20">
                        <p className="text-foreground text-sm leading-relaxed">
                          {expandedReviews.has(currentIndex)
                            ? currentReview.reviewText
                            : truncateText(currentReview.reviewText)
                          }
                          {currentReview.reviewText.length > 150 && !expandedReviews.has(currentIndex) && (
                            <span className="text-muted-foreground">...</span>
                          )}
                        </p>
                        {currentReview.reviewText.length > 150 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleReadMore(currentIndex)
                            }}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2 underline focus:outline-none transition-colors"
                          >
                            {expandedReviews.has(currentIndex) ? 'Read less' : 'Read more'}
                            {expandedReviews.has(currentIndex) ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
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