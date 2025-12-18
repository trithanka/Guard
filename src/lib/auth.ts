import { betterAuth, generateId } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";
import { db } from "./db"; // your drizzle instance
import * as schema from "../../db/index";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
		schema: {
			user: schema.user,
			session: schema.session,
			account: schema.account,
			verification: schema.verification,
		},
	}),
	plugins: [
		phoneNumber({
			sendOTP: async ({ phoneNumber, code }, _ctx) => {
				// Check if user with this phone number already exists
				const existingUser = await db
					.select()
					.from(schema.user)
					.where(eq(schema.user.phoneNumber, phoneNumber))
					.limit(1);

				// If user doesn't exist, create one with just phoneNumber and createdAt
				if (existingUser.length === 0) {
					const userId = generateId();
					await db.insert(schema.user).values({
						id: userId,
						phoneNumber: phoneNumber,
						emailVerified: false,
						phoneNumberVerified: false,
						emergencyContacts: [],
						// name, email, image are nullable and will be null
					});
				}

				// TODO: Implement sending OTP code via SMS
				// Example with Twilio, AWS SNS, or your SMS provider:
				// await smsProvider.send(phoneNumber, `Your verification code is: ${code}`);
			},
		}),
	],
});
