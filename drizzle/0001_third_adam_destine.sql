ALTER TABLE "persons" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "persons" ADD COLUMN "email" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "persons" ADD COLUMN "password" varchar(100) NOT NULL;