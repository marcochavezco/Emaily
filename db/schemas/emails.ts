import { sql } from 'drizzle-orm';
import { jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
export const emailsTable = pgTable('emails', {
  id: serial('id').primaryKey(),

  name: text('name').notNull(),
  subject: text('subject').notNull(),
  status: text('status').notNull().default('draft'),

  content: jsonb('content')
    .notNull()
    .default(sql`'[]'::jsonb`),
  html: text('html').notNull().default(''),
  previewHtml: text('preview_html').notNull().default(''),
  previewUrl: text('preview_url').notNull().default(''),

  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedBy: text('updated_by').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
