import type { Review } from './db/schema'

export type CreateReviewData = {
  customerName: string
  rating: number
  reviewText: string
  serviceType: string
  userIdentifier?: string
}

export async function createReview(reviewData: CreateReviewData): Promise<Review> {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to create review')
  }

  return response.json()
}

export async function getReviews(): Promise<Review[]> {
  const response = await fetch('/api/reviews', {
    method: 'GET',
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch reviews')
  }

  return response.json()
}

export async function updateReview(id: string, reviewData: CreateReviewData): Promise<Review> {
  const response = await fetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to update review')
  }

  return response.json()
}

export async function getUserReviews(userIdentifier: string): Promise<Review[]> {
  const response = await fetch(`/api/reviews/my-reviews?userIdentifier=${encodeURIComponent(userIdentifier)}`, {
    method: 'GET',
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch user reviews')
  }

  return response.json()
}

export async function deleteReview(id: string, userIdentifier: string): Promise<void> {
  const response = await fetch(`/api/reviews/${id}?userIdentifier=${encodeURIComponent(userIdentifier)}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to delete review')
  }
}


export function getClientIdentifier(): string {
  // Check if we're in the browser environment
  if (typeof window === 'undefined') {
    return '' // Return empty string during SSR
  }
  
  // Use localStorage + a simple hash for client identification
  let identifier = localStorage.getItem('review_identifier')
  if (!identifier) {
    identifier = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('review_identifier', identifier)
  }
  return identifier
}