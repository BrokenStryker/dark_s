import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/connection'
import { reviews, type NewReview } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt))
    return NextResponse.json(allReviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, rating, reviewText, serviceType } = body

    if (!customerName || !rating || !reviewText || !serviceType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const [newReview] = await db.insert(reviews).values({
      customerName,
      rating,
      reviewText,
      serviceType,
    }).returning()

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}