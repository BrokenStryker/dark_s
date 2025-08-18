ALTER TABLE "reviews" ADD COLUMN "user_identifier" varchar(255);--> statement-breakpoint
CREATE INDEX "reviews_user_identifier_idx" ON "reviews" USING btree ("user_identifier");