ALTER TABLE "user" ALTER COLUMN "phoneNumberVerified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "gender" varchar(20);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "dob" date;