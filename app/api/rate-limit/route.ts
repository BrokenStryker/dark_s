import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/connection'
import { reviewRateLimits } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const RATE_LIMIT_HOURS = 5

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const identifier = searchParams.get('identifier')

    if (!identifier) {
      return NextResponse.json({ error: 'Identifier is required' }, { status: 400 })
    }

    const [rateLimit] = await db
      .select()
      .from(reviewRateLimits)
      .where(eq(reviewRateLimits.identifier, identifier))
      .limit(1)
    
    if (!rateLimit) {
      return NextResponse.json({ canSubmit: true })
    }

    const lastReview = new Date(rateLimit.lastReviewAt)
    const now = new Date()
    const hoursSinceLastReview = (now.getTime() - lastReview.getTime()) / (1000 * 60 * 60)
    
    const canSubmit = hoursSinceLastReview >= RATE_LIMIT_HOURS
    const timeLeft = canSubmit ? 0 : RATE_LIMIT_HOURS - hoursSinceLastReview

    return NextResponse.json({ 
      canSubmit, 
      timeLeft: Math.max(0, timeLeft)
    })
  } catch (error) {
    console.error('Error checking rate limit:', error)
    return NextResponse.json({ error: 'Failed to check rate limit' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { identifier } = body

    if (!identifier) {
      return NextResponse.json({ error: 'Identifier is required' }, { status: 400 })
    }

    await db
      .insert(reviewRateLimits)
      .values({
        identifier,
        lastReviewAt: new Date(),
      })
      .onConflictDoUpdate({
        target: reviewRateLimits.identifier,
        set: {
          lastReviewAt: new Date(),
        },
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating rate limit:', error)
    return NextResponse.json({ error: 'Failed to update rate limit' }, { status: 500 })
  }
}