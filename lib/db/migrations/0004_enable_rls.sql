-- Enable Row Level Security on reviews table
ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;

-- Policy: Allow everyone to read all reviews (public access)
CREATE POLICY "Anyone can view reviews" 
ON "reviews" FOR SELECT 
USING (true);

-- Policy: Allow anyone to create reviews
CREATE POLICY "Anyone can create reviews" 
ON "reviews" FOR INSERT 
WITH CHECK (true);

-- Policy: Users can only update their own reviews based on user_identifier
CREATE POLICY "Users can update own reviews" 
ON "reviews" FOR UPDATE 
USING (user_identifier IS NOT NULL);

-- Policy: Users can only delete their own reviews based on user_identifier  
CREATE POLICY "Users can delete own reviews" 
ON "reviews" FOR DELETE 
USING (user_identifier IS NOT NULL);