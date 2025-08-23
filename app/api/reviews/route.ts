import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, type DatabaseReview } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()
    
    const { data: allReviews, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }
    
    // Transform snake_case to camelCase to match frontend expectations
    const transformedReviews = allReviews.map((review: any) => ({
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
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, rating, reviewText, serviceType, userIdentifier } = body

    if (!customerName || !rating || !reviewText || !serviceType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    
    const { data: newReview, error } = await supabase
      .from('reviews')
      .insert({
        customer_name: customerName,
        rating,
        review_text: reviewText,
        service_type: serviceType,
        user_identifier: userIdentifier || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
    }

    // Transform snake_case to camelCase to match frontend expectations
    const transformedReview = {
      id: newReview.id,
      customerName: newReview.customer_name,
      rating: newReview.rating,
      reviewText: newReview.review_text,
      serviceType: newReview.service_type,
      userIdentifier: newReview.user_identifier,
      createdAt: newReview.created_at,
      updatedAt: newReview.updated_at,
    }
    
    return NextResponse.json(transformedReview, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}