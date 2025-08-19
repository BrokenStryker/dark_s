"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/ui/star-rating"
import { SectionContainer } from "@/components/ui/section-container"
import { ContentCard } from "@/components/ui/content-card"
import { SectionTitle, BodyText } from "@/components/ui/typography"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { 
  createReview, 
  getReviews, 
  updateReview, 
  getClientIdentifier,
  type CreateReviewData
} from "@/lib/review-service"
import { MyReviewsDialog } from "@/components/ui/my-reviews-dialog"
import type { Review } from "@/lib/db/schema"
import { LAYOUT, SPACING, TYPOGRAPHY, COMPONENTS } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import { MessageSquarePlus, User, Quote, Eye } from "lucide-react"
import { toast } from "sonner"

const reviewSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  rating: z.number().min(1).max(5),
  review_text: z.string().min(10, "Review must be at least 10 characters").max(1000, "Review must be less than 1000 characters"),
  service_type: z.string().min(1, "Please select a service type")
})

type ReviewFormData = z.infer<typeof reviewSchema>

const serviceTypes = [
  // Blonding Services
  "Full Blonding",
  "Partial Blonding", 
  "Mini Blonding",
  "Reverse Balayage",
  
  // Color Services
  "All Over Color",
  "Root Touch-Up",
  "Vivid Pop of Color",
  "Glaze",
  
  // Haircut Services
  "Medium/Long Haircut",
  "Bang Trim",
  
  // Blowdry & Styling Services
  "Blowout",
  "Blowout with Extensions",
  "Brazilian Blowout",
  "Recovery Package",
  
  // Add-On Treatments
  "Malibu Treatment",
  "Conditioning Mask",
  
  // Other
  "Other"
]

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [myReviewsOpen, setMyReviewsOpen] = useState(false)
  const [userIdentifier, setUserIdentifier] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      customer_name: "",
      rating: 5,
      review_text: "",
      service_type: ""
    }
  })

  useEffect(() => {
    setMounted(true)
    const identifier = getClientIdentifier()
    setUserIdentifier(identifier)
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      const reviewsData = await getReviews()
      setReviews(reviewsData)
    } catch (error) {
      console.error("Error loading reviews:", error)
    }
  }

  const handleReviewClick = () => {
    setDialogOpen(true)
  }

  const onSubmit = async (data: ReviewFormData) => {
    setLoading(true)
    try {
      const identifier = userIdentifier || getClientIdentifier()
      if (!identifier) {
        throw new Error('Unable to get user identifier')
      }
      
      const reviewData: CreateReviewData = {
        customerName: data.customer_name,
        rating: data.rating,
        reviewText: data.review_text,
        serviceType: data.service_type,
        userIdentifier: identifier,
      }

      await createReview(reviewData)
      await loadReviews()
      
      form.reset()
      setDialogOpen(false)
      toast.success("Review submitted successfully!", {
        description: "Thank you for sharing your experience.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Failed to submit review", {
        description: "Please try again later.",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

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
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              {/* My Reviews Button - Always Available */}
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setMyReviewsOpen(true)}
                className={cn(
                  "bg-white/80 text-black hover:bg-white border-black/20",
                  TYPOGRAPHY.fontFutura,
                  "gap-2"
                )}
              >
                <Eye className="w-5 h-5" />
                My Reviews
              </Button>

              {/* Add Review Button */}
              <Button 
                size="lg"
                onClick={handleReviewClick}
                className={cn(
                  "bg-[#908476] text-white hover:bg-[#908476]/90",
                  "px-8 py-3 text-lg border-0",
                  TYPOGRAPHY.fontFutura,
                  "gap-2"
                )}
              >
                <MessageSquarePlus className="w-5 h-5" />
                Share Your Experience
              </Button>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              
              <DialogContent className="w-[95vw] h-[95vh] max-w-none sm:w-[90vw] sm:h-[90vh] md:w-[80vw] md:h-[85vh] lg:w-[70vw] lg:h-[80vh] xl:w-[60vw] xl:h-[75vh] bg-[#908476] bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat overflow-y-auto">
                <div className="bg-[#c8c2bb]/95 backdrop-blur-sm rounded-lg p-6 h-full overflow-y-auto">
                  <DialogHeader className="mb-6">
                    <DialogTitle className={cn(TYPOGRAPHY.cardTitle, "text-black")}>Share Your Experience</DialogTitle>
                    <DialogDescription className="text-black/80">
                      Tell us about your experience at Dark Serenity. Your feedback helps us continue providing exceptional service.
                    </DialogDescription>
                  </DialogHeader>
                
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="customer_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-semibold">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
                              {...field}
                              disabled={loading}
                              className="bg-white/90 border-black/20 text-black placeholder:text-black/60"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="service_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-semibold">Service Received</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={loading}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white/90 border-black/20 text-black">
                                <SelectValue placeholder="Select service type" className="placeholder:text-black/60" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-black/20">
                              {serviceTypes.map((service) => (
                                <SelectItem key={service} value={service} className="text-black focus:bg-[#c8c2bb]/50">
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-semibold">Rating</FormLabel>
                          <FormControl>
                            <StarRating
                              rating={field.value}
                              onRatingChange={field.onChange}
                              readonly={loading}
                              size="lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="review_text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-semibold">Your Review</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share your experience..."
                              rows={5}
                              {...field}
                              disabled={loading}
                              className="bg-white/90 border-black/20 text-black placeholder:text-black/60 min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                      <DialogFooter className="mt-8 pt-6 border-t border-black/10">
                        <Button
                          type="submit"
                          disabled={loading}
                          size="lg"
                          className={cn(
                            "bg-[#908476] text-white hover:bg-[#908476]/90 w-full sm:w-auto",
                            TYPOGRAPHY.fontFutura
                          )}
                        >
                          {loading ? "Submitting..." : "Submit Review"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
            </div>

            {/* My Reviews Dialog */}
            {mounted && userIdentifier && (
              <MyReviewsDialog
                open={myReviewsOpen}
                onOpenChange={setMyReviewsOpen}
                userIdentifier={userIdentifier}
                onReviewUpdated={loadReviews}
              />
            )}
          </div>

          {/* Reviews Carousel */}
          {reviews.length === 0 ? (
            <Card className={cn(COMPONENTS.luxuryCard, "bg-card/50")}>
              <CardContent className="text-center py-12">
                <Quote className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <BodyText muted>No reviews yet. Be the first to share your experience!</BodyText>
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
                  {reviews.map((review) => (
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
                
                {reviews.length > 3 && (
                  <>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
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