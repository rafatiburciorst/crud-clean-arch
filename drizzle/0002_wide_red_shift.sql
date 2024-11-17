CREATE TABLE IF NOT EXISTS "addresses" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"street" varchar(150) NOT NULL,
	"home_number" varchar(30),
	"district" varchar(150) NOT NULL,
	"zip_number" varchar(50) NOT NULL,
	"person_id" char(32) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "persons" ALTER COLUMN "id" SET DATA TYPE char(24);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
