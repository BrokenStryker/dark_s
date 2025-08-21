ALTER TABLE "review_helpful_votes" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "review_images" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "review_rate_limits" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "review_responses" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "review_helpful_votes" CASCADE;--> statement-breakpoint
DROP TABLE "review_images" CASCADE;--> statement-breakpoint
DROP TABLE "review_rate_limits" CASCADE;--> statement-breakpoint
DROP TABLE "review_responses" CASCADE;--> statement-breakpoint
DROP INDEX "reviews_featured_rating_idx";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "is_verified";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "helpful_count";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "featured";