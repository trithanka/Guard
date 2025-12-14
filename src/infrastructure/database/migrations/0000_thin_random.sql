CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"phone" varchar(15) NOT NULL,
	"name" varchar(100),
	"email" varchar(100),
	"emergency_contacts" jsonb DEFAULT '[]'::jsonb,
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE INDEX "users_phone_idx" ON "users" USING btree ("phone");