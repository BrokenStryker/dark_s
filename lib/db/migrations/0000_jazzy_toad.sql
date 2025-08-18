CREATE TABLE "review_rate_limits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" varchar(255) NOT NULL,
	"last_review_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "review_rate_limits_identifier_unique" UNIQUE("identifier")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_name" varchar(100) NOT NULL,
	"rating" integer NOT NULL,
	"review_text" text NOT NULL,
	"service_type" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
