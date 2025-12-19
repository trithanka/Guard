import type { Context } from "hono";
import { handleAsync } from "../../utils/response";
import { UserService } from "./user.service";
import { auth } from "../../lib/auth";

const userService = new UserService();

export class UserController {
	/**
	 * Update user profile
	 */
	async updateProfile(c: Context) {
		return handleAsync(
			c,
			async () => {
				// Get current user from Better Auth session
				const session = await auth.api.getSession({
					headers: c.req.raw.headers,
				});

				if (!session?.user?.id) {
					throw new Error("Unauthorized - Please login first");
				}

				const body = await c.req.json();
				const { name, gender, dob, email } = body;

				const updatedUser = await userService.updateProfile(
					session.user.id,
					{
						name,
						gender,
						dob,
						email,
					}
				);

				return updatedUser;
			},
			"Profile updated successfully",
			"Failed to update profile",
		);
	}

	/**
	 * Get current user profile
	 */
	async getProfile(c: Context) {
		return handleAsync(
			c,
			async () => {
				// Get current user from Better Auth session
				const session = await auth.api.getSession({
					headers: c.req.raw.headers,
				});

				if (!session?.user?.id) {
					throw new Error("Unauthorized - Please login first");
				}

				const user = await userService.getProfile(session.user.id);
				return user;
			},
			"Profile retrieved successfully",
			"Failed to retrieve profile",
		);
	}
}

