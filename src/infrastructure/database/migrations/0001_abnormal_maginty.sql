ALTER TABLE "users" RENAME COLUMN "phone" TO "phoneNumber";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "emergency_contacts" TO "emergencyContacts";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is_verified" TO "phoneNumberVerified";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_phone_unique";--> statement-breakpoint
DROP INDEX "users_phone_idx";--> statement-breakpoint
CREATE INDEX "users_phone_idx" ON "users" USING btree ("phoneNumber");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phoneNumber_unique" UNIQUE("phoneNumber");