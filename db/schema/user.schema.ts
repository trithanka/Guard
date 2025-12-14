import { pgTable, uuid, varchar, jsonb, boolean, timestamp, index } from 'drizzle-orm/pg-core';

// === USERS TABLE (Users Domain) ===

export const users = pgTable('users', {
  user_id: uuid('id').defaultRandom().primaryKey(),
  phoneNumber: varchar('phoneNumber', { length: 15 }).unique(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 100 }),
  emergencyContacts: jsonb('emergencyContacts').$type<string[]>().default([]), // ["+919876543210"]
  phoneNumberVerified: boolean('phoneNumberVerified').default(false),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().$onUpdateFn(() => new Date()),
}, (table) => ({
  phoneIdx: index('users_phone_idx').on(table.phoneNumber),
}));

