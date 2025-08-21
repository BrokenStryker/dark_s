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

    return NextResponse.json(userReviews)
  } catch (error) {
    console.error('Error fetching user reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch user reviews' }, { status: 500 })
  }
}