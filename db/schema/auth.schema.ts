import { boolean, date, index, jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

// === BETTER-AUTH REQUIRED TABLES ===
// Extended user table with custom columns from your original users table
export const user = pgTable(
	"user",
	{
		// Better-auth required columns
		id: text("id").primaryKey(),
		name: text("name"), // Nullable - user may not have name during phone verification
		email: text("email"),
		emailVerified: boolean("emailVerified").notNull().default(false),
		image: text("image"),
		createdAt: timestamp("createdAt").notNull().defaultNow(),
		updatedAt: timestamp("updatedAt")
			.notNull()
			.defaultNow()
			.$onUpdateFn(() => new Date()),
		// Your custom columns
		phoneNumber: varchar("phoneNumber", { length: 15 }).unique(),
		emergencyContacts: jsonb("emergencyContacts").$type<string[]>().default([]), // ["+919876543210"]
		phoneNumberVerified: boolean("phoneNumberVerified").notNull().default(false),
		gender: varchar("gender", { length: 20 }), // e.g., "male", "female", "other"
		dob: date("dob"), // Date of birth
	},
	(table) => ({
		phoneIdx: index("user_phoneNumber_idx").on(table.phoneNumber),
	})
);

export const session = pgTable(
	"session",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expiresAt").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("createdAt").notNull().defaultNow(),
		updatedAt: timestamp("updatedAt").notNull().defaultNow(),
		ipAddress: text("ipAddress"),
		userAgent: text("userAgent"),
		userId: text("userId")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => ({
		userIdIdx: index("session_userId_idx").on(table.userId),
		tokenIdx: index("session_token_idx").on(table.token),
	})
);

export const account = pgTable(
	"account",
	{
		id: text("id").primaryKey(),
		accountId: text("accountId").notNull(),
		providerId: text("providerId").notNull(),
		userId: text("userId")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("accessToken"),
		refreshToken: text("refreshToken"),
		expiresAt: timestamp("expiresAt"),
		password: text("password"),
		createdAt: timestamp("createdAt").notNull().defaultNow(),
		updatedAt: timestamp("updatedAt").notNull().defaultNow(),
	},
	(table) => ({
		userIdIdx: index("account_userId_idx").on(table.userId),
		providerAccountIdx: index("account_providerAccount_idx").on(
			table.providerId,
			table.accountId
		),
	})
);

// Minimal verification table for phoneNumber plugin
// Only essential columns: identifier (phone number) and value (OTP code)
export const verification = pgTable(
	"verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(), // phone number
		value: text("value").notNull(), // OTP code
		expiresAt: timestamp("expiresAt").notNull(),
		createdAt: timestamp("createdAt").notNull().defaultNow(),
		updatedAt: timestamp("updatedAt").notNull().defaultNow(),
	},
	(table) => ({
		identifierIdx: index("verification_identifier_idx").on(table.identifier),
	})
);

