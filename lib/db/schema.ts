import { pgTable, uuid, varchar, integer, text, timestamp, boolean, index } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerName: varchar('customer_name', { length: 100 }).notNull(),
  rating: integer('rating').notNull(),
  reviewText: text('review_text').notNull(),
  serviceType: varchar('service_type', { length: 100 }).notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  helpfulCount: integer('helpful_count').default(0).notNull(),
  featured: boolean('featured').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  createdAtIdx: index('reviews_created_at_idx').on(table.createdAt),
  ratingIdx: index('reviews_rating_idx').on(table.rating),
  serviceTypeIdx: index('reviews_service_type_idx').on(table.serviceType),
  featuredRatingIdx: index('reviews_featured_rating_idx').on(table.featured, table.rating),
}))

export const reviewImages = pgTable('review_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  reviewId: uuid('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
  imageUrl: varchar('image_url', { length: 500 }).notNull(),
  altText: varchar('alt_text', { length: 255 }),
  displayOrder: integer('display_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  reviewIdIdx: index('review_images_review_id_idx').on(table.reviewId),
}))

export const reviewResponses = pgTable('review_responses', {
  id: uuid('id').defaultRandom().primaryKey(),
  reviewId: uuid('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
  responseText: text('response_text').notNull(),
  authorName: varchar('author_name', { length: 100 }).notNull().default('Amberrose Seiferth'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  reviewIdIdx: index('review_responses_review_id_idx').on(table.reviewId),
}))

export const reviewHelpfulVotes = pgTable('review_helpful_votes', {
  id: uuid('id').defaultRandom().primaryKey(),
  reviewId: uuid('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  reviewIdIdx: index('review_helpful_votes_review_id_idx').on(table.reviewId),
  uniqueVote: index('review_helpful_votes_unique_idx').on(table.reviewId, table.identifier),
}))

export const reviewRateLimits = pgTable('review_rate_limits', {
  id: uuid('id').defaultRandom().primaryKey(),
  identifier: varchar('identifier', { length: 255 }).notNull().unique(),
  lastReviewAt: timestamp('last_review_at', { withTimezone: true }).defaultNow().notNull(),
  attemptCount: integer('attempt_count').default(0).notNull(),
  blockedUntil: timestamp('blocked_until', { withTimezone: true }),
})

export type Review = typeof reviews.$inferSelect
export type NewReview = typeof reviews.$inferInsert
export type ReviewImage = typeof reviewImages.$inferSelect
export type NewReviewImage = typeof reviewImages.$inferInsert
export type ReviewResponse = typeof reviewResponses.$inferSelect
export type NewReviewResponse = typeof reviewResponses.$inferInsert
export type ReviewHelpfulVote = typeof reviewHelpfulVotes.$inferSelect
export type NewReviewHelpfulVote = typeof reviewHelpfulVotes.$inferInsert
export type ReviewRateLimit = typeof reviewRateLimits.$inferSelect
export type NewReviewRateLimit = typeof reviewRateLimits.$inferInsert