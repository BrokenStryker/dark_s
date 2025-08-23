import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userIdentifier = searchParams.get('userIdentifier')

    if (!userIdentifier) {
      return NextResponse.json({ error: 'User identifier is required' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    
    const { data: userReviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_identifier', userIdentifier)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch user reviews' }, { status: 500 })
    }

    // Transform snake_case to camelCase to match frontend expectations
    const transformedReviews = userReviews.map((review: any) => ({
      id: review.id,
      customerName: review.customer_name,
      rating: review.rating,
      reviewText: review.review_text,
      serviceType: review.service_type,
      userIdentifier: review.user_identifier,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
    }))
    
    return NextResponse.json(transformedReviews)
  } catch (error) {
    console.error('Error fetching user reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch user reviews' }, { status: 500 })
  }
}