import { pgTable, uuid, varchar, integer, text, timestamp, boolean, index } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerName: varchar('customer_name', { length: 100 }).notNull(),
  rating: integer('rating').notNull(),
  reviewText: text('review_text').notNull(),
  serviceType: varchar('service_type', { length: 100 }).notNull(),
  userIdentifier: varchar('user_identifier', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  createdAtIdx: index('reviews_created_at_idx').on(table.createdAt),
  ratingIdx: index('reviews_rating_idx').on(table.rating),
  serviceTypeIdx: index('reviews_service_type_idx').on(table.serviceType),
  userIdentifierIdx: index('reviews_user_identifier_idx').on(table.userIdentifier),
}))


export type Review = typeof reviews.$inferSelect
export type NewReview = typeof reviews.$inferInsert