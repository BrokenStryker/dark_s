import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create server-side Supabase client
export function createServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Database types for reviews
export type DatabaseReview = {
  id: string
  customer_name: string
  rating: number
  review_text: string
  service_type: string
  user_identifier: string | null
  created_at: string
  updated_at: string
}