import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Review = {
  id: string
  customer_name: string
  rating: number
  review_text: string
  service_type: string
  created_at: string
  updated_at: string
}

export type ReviewRateLimit = {
  id: string
  identifier: string
  last_review_at: string
}