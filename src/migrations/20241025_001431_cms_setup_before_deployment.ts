import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "overlay_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"button_text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "seo_properties" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "delivery_time_ranges" ADD COLUMN "upper_fallback" varchar DEFAULT '1 hour+' NOT NULL;
  ALTER TABLE "delivery_time_ranges" ADD COLUMN "lower_fallback" varchar DEFAULT 'Instant' NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "overlay_content" ADD CONSTRAINT "overlay_content_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "delivery_time_ranges" DROP COLUMN IF EXISTS "fallback_upper";
  ALTER TABLE "delivery_time_ranges" DROP COLUMN IF EXISTS "fallback_lower";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "overlay_content";
  DROP TABLE "seo_properties";
  ALTER TABLE "delivery_time_ranges" ADD COLUMN "fallback_upper" varchar DEFAULT '1 hour+' NOT NULL;
  ALTER TABLE "delivery_time_ranges" ADD COLUMN "fallback_lower" varchar DEFAULT 'Instant' NOT NULL;
  ALTER TABLE "delivery_time_ranges" DROP COLUMN IF EXISTS "upper_fallback";
  ALTER TABLE "delivery_time_ranges" DROP COLUMN IF EXISTS "lower_fallback";`)
}
