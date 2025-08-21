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
    
    return NextResponse.json(allReviews)
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

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}