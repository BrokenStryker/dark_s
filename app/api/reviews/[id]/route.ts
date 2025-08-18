import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/connection'
import { reviews } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { customerName, rating, reviewText, serviceType, userIdentifier } = body
    const { id } = params

    if (!customerName || !rating || !reviewText || !serviceType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // First, verify the review belongs to the user
    const [existingReview] = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, id))
      .limit(1)

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    // Only check userIdentifier if both exist (for backwards compatibility)
    if (userIdentifier && existingReview.userIdentifier && existingReview.userIdentifier !== userIdentifier) {
      return NextResponse.json({ error: 'Unauthorized to edit this review' }, { status: 403 })
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

    return NextResponse.json(updatedReview)
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const userIdentifier = searchParams.get('userIdentifier')
    const { id } = params

    if (!userIdentifier) {
      return NextResponse.json({ error: 'User identifier is required' }, { status: 400 })
    }

    // First, verify the review belongs to the user
    const [existingReview] = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, id))
      .limit(1)

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    // Only check userIdentifier if both exist (for backwards compatibility)
    if (userIdentifier && existingReview.userIdentifier && existingReview.userIdentifier !== userIdentifier) {
      return NextResponse.json({ error: 'Unauthorized to delete this review' }, { status: 403 })
    }

    await db.delete(reviews).where(eq(reviews.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}