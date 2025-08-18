import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/connection'
import { reviewRateLimits } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const RATE_LIMIT_HOURS = 5

export async function GET(request: NextRequest) {
  // Rate limiting disabled - always allow submissions
  return NextResponse.json({ 
    canSubmit: true, 
    timeLeft: 0
  })
}

export async function POST(request: NextRequest) {
  // Rate limiting disabled - do nothing, just return success
  return NextResponse.json({ success: true })
}