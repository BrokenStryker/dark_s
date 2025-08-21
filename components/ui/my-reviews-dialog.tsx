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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  getUserReviews, 
  updateReview, 
  deleteReview,
  type CreateReviewData
} from "@/lib/review-service"
import type { Review } from "@/lib/supabase"
import { TYPOGRAPHY } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import { Edit3, Trash2, Calendar, Star, MessageSquare } from "lucide-react"

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

interface MyReviewsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userIdentifier: string
  onReviewUpdated: () => void
}

export function MyReviewsDialog({ open, onOpenChange, userIdentifier, onReviewUpdated }: MyReviewsDialogProps) {
  const [myReviews, setMyReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [deletingReview, setDeletingReview] = useState<Review | null>(null)

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
    if (open && userIdentifier) {
      loadMyReviews()
    }
  }, [open, userIdentifier])

  const loadMyReviews = async () => {
    if (!userIdentifier) return
    
    try {
      setLoading(true)
      const reviews = await getUserReviews(userIdentifier)
      setMyReviews(reviews)
    } catch (error) {
      console.error("Error loading user reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditReview = (review: Review) => {
    setEditingReview(review)
    form.reset({
      customer_name: review.customer_name,
      rating: review.rating,
      review_text: review.review_text,
      service_type: review.service_type
    })
  }

  const handleUpdateReview = async (data: ReviewFormData) => {
    if (!editingReview) return

    try {
      setLoading(true)
      const reviewData: CreateReviewData = {
        customerName: data.customer_name,
        rating: data.rating,
        reviewText: data.review_text,
        serviceType: data.service_type,
        userIdentifier,
      }

      await updateReview(editingReview.id, reviewData)
      await loadMyReviews()
      onReviewUpdated()
      setEditingReview(null)
      form.reset()
    } catch (error) {
      console.error("Error updating review:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReview = async () => {
    if (!deletingReview) return

    try {
      setLoading(true)
      await deleteReview(deletingReview.id, userIdentifier)
      await loadMyReviews()
      onReviewUpdated()
      setDeletingReview(null)
    } catch (error) {
      console.error("Error deleting review:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open && !editingReview} onOpenChange={onOpenChange}>
        <DialogContent className="w-[95vw] h-[95vh] max-w-none sm:w-[90vw] sm:h-[90vh] md:w-[80vw] md:h-[85vh] lg:w-[70vw] lg:h-[80vh] xl:w-[60vw] xl:h-[75vh] bg-[#908476] bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat overflow-y-auto">
          <div className="bg-[#c8c2bb]/95 backdrop-blur-sm rounded-lg p-6 h-full overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className={cn(TYPOGRAPHY.cardTitle, "text-black")}>My Reviews</DialogTitle>
              <DialogDescription className="text-black/80">
                View and manage all your reviews. You can edit or delete your reviews at any time.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {loading && myReviews.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-black/50" />
                  <p className="text-black/70">Loading your reviews...</p>
                </div>
              ) : myReviews.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-black/50" />
                  <p className="text-black/70">You haven't left any reviews yet.</p>
                </div>
              ) : (
                myReviews.map((review) => (
                  <Card key={review.id} className="bg-white/90 border-black/20">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Header with date and actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-black/60">
                            <Calendar className="w-4 h-4" />
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditReview(review)}
                              disabled={loading}
                              className="bg-white/50 hover:bg-white/80 border-black/20"
                            >
                              <Edit3 className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeletingReview(review)}
                              disabled={loading}
                              className="bg-red-50/50 hover:bg-red-100/80 border-red-300/50 text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>

                        {/* Rating and service */}
                        <div className="flex items-center justify-between">
                          <StarRating rating={review.rating} readonly size="sm" />
                          <span className="text-sm text-black/60 bg-black/5 px-2 py-1 rounded">
                            {review.service_type}
                          </span>
                        </div>

                        {/* Review text */}
                        <div className="bg-black/5 rounded-lg p-3">
                          <p className="text-black leading-relaxed">{review.review_text}</p>
                        </div>

                        {/* Customer name */}
                        <div className="text-sm text-black/60">
                          <strong>Posted by:</strong> {review.customer_name}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Review Dialog */}
      <Dialog open={!!editingReview} onOpenChange={(open) => !open && setEditingReview(null)}>
        <DialogContent className="w-[95vw] h-[95vh] max-w-none sm:w-[90vw] sm:h-[90vh] md:w-[80vw] md:h-[85vh] lg:w-[70vw] lg:h-[80vh] xl:w-[60vw] xl:h-[75vh] bg-[#908476] bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat overflow-y-auto">
          <div className="bg-[#c8c2bb]/95 backdrop-blur-sm rounded-lg p-6 h-full overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className={cn(TYPOGRAPHY.cardTitle, "text-black")}>Edit Review</DialogTitle>
              <DialogDescription className="text-black/80">
                Update your review below. Your changes will be saved immediately.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateReview)} className="space-y-6">
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
                        value={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/90 border-black/20 text-black">
                            <SelectValue placeholder="Select service type" />
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
                    type="button"
                    variant="outline"
                    onClick={() => setEditingReview(null)}
                    disabled={loading}
                    className="bg-white/50 hover:bg-white/80 border-black/20"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className={cn(
                      "bg-[#908476] text-white hover:bg-[#908476]/90",
                      TYPOGRAPHY.fontFutura
                    )}
                  >
                    {loading ? "Updating..." : "Update Review"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingReview} onOpenChange={(open) => !open && setDeletingReview(null)}>
        <AlertDialogContent className="bg-[#c8c2bb] border-black/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">Delete Review</AlertDialogTitle>
            <AlertDialogDescription className="text-black/80">
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              disabled={loading}
              className="bg-white/50 hover:bg-white/80 border-black/20 text-black"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReview}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}