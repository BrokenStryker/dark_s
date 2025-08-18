import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/connection'
import { reviews } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userIdentifier = searchParams.get('userIdentifier')

    if (!userIdentifier) {
      return NextResponse.json({ error: 'User identifier is required' }, { status: 400 })
    }

    const userReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.userIdentifier, userIdentifier))
      .orderBy(desc(reviews.createdAt))

    return NextResponse.json(userReviews)
  } catch (error) {
    console.error('Error fetching user reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch user reviews' }, { status: 500 })
  }
}