import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json()
    const { customerName, rating, reviewText, serviceType, userIdentifier } = body
    const { id } = await params

    if (!customerName || !rating || !reviewText || !serviceType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // First, verify the review belongs to the user
    const { data: existingReview, error: fetchError } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .eq('user_identifier', userIdentifier)
      .single()

    if (fetchError || !existingReview) {
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 })
    }

    // Update the review
    const { data: updatedReview, error: updateError } = await supabase
      .from('reviews')
      .update({
        customer_name: customerName,
        rating,
        review_text: reviewText,
        service_type: serviceType,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_identifier', userIdentifier)
      .select()
      .single()

    if (updateError) {
      console.error('Supabase update error:', updateError)
      return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
    }

    // Transform snake_case to camelCase to match frontend expectations
    const transformedReview = {
      id: updatedReview.id,
      customerName: updatedReview.customer_name,
      rating: updatedReview.rating,
      reviewText: updatedReview.review_text,
      serviceType: updatedReview.service_type,
      userIdentifier: updatedReview.user_identifier,
      createdAt: updatedReview.created_at,
      updatedAt: updatedReview.updated_at,
    }
    
    return NextResponse.json(transformedReview)
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { searchParams } = new URL(request.url)
    const userIdentifier = searchParams.get('userIdentifier')
    const { id } = await params

    if (!userIdentifier) {
      return NextResponse.json({ error: 'User identifier is required' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // First, verify the review belongs to the user
    const { data: existingReview, error: fetchError } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .eq('user_identifier', userIdentifier)
      .single()

    if (fetchError || !existingReview) {
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 })
    }

    // Delete the review
    const { error: deleteError } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)
      .eq('user_identifier', userIdentifier)

    if (deleteError) {
      console.error('Supabase delete error:', deleteError)
      return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}