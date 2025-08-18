import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/connection'
import { reviews } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { customerName, rating, reviewText, serviceType } = body
    const { id } = params

    if (!customerName || !rating || !reviewText || !serviceType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const [updatedReview] = await db
      .update(reviews)
      .set({
        customerName,
        rating,
        reviewText,
        serviceType,
        updatedAt: new Date(),
      })
      .where(eq(reviews.id, id))
      .returning()

    if (!updatedReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    return NextResponse.json(updatedReview)
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}