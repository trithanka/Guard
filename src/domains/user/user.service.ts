import { db } from "../../lib/db";
import * as schema from "../../../db/index";
import { eq } from "drizzle-orm";

export interface UpdateUserProfileData {
	name?: string;
	gender?: string;
	dob?: string; // ISO date string
	email?: string;
}

export class UserService {
	/**
	 * Update user profile
	 */
	async updateProfile(userId: string, data: UpdateUserProfileData) {
		if (!userId) {
			throw new Error("User ID is required");
		}

		// Check if user exists
		const existingUser = await db
			.select()
			.from(schema.user)
			.where(eq(schema.user.id, userId))
			.limit(1);

		if (existingUser.length === 0) {
			throw new Error("User not found");
		}

		// Prepare update data
		const updateData: Partial<typeof schema.user.$inferInsert> = {};

		if (data.name !== undefined) {
			updateData.name = data.name;
		}

		if (data.gender !== undefined) {
			updateData.gender = data.gender;
		}

		if (data.dob !== undefined) {
			// Convert ISO date string to Date object
			updateData.dob = data.dob ? new Date(data.dob) : null;
		}

		if (data.email !== undefined) {
			updateData.email = data.email;
			// Reset emailVerified when email is updated
			if (data.email) {
				updateData.emailVerified = false;
			}
		}

		// Update user
		const [updatedUser] = await db
			.update(schema.user)
			.set(updateData)
			.where(eq(schema.user.id, userId))
			.returning();

		return updatedUser;
	}

	/**
	 * Get user profile by ID
	 */
	async getProfile(userId: string) {
		if (!userId) {
			throw new Error("User ID is required");
		}

		const [user] = await db
			.select()
			.from(schema.user)
			.where(eq(schema.user.id, userId))
			.limit(1);

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}
}

