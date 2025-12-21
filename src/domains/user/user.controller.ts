import type { Context } from "hono";
import { handleAsync } from "../../utils/response";
import { UserService } from "./user.service";
import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
import { session } from "../../../db/schema/auth.schema";
import { eq, gt } from "drizzle-orm";

const userService = new UserService();

/**
 * Get user ID from session token (fallback when Better Auth cookie parsing fails)
 */
async function getUserIdFromToken(sessionToken: string): Promise<string | null> {
	try {
		const [sessionRecord] = await db
			.select()
			.from(session)
			.where(eq(session.token, sessionToken))
			.limit(1);

		if (!sessionRecord) {
			return null;
		}

		// Check if session is expired
		if (sessionRecord.expiresAt < new Date()) {
			return null;
		}

		return sessionRecord.userId;
	} catch (error) {
		console.error("Error getting user from token:", error);
		return null;
	}
}

/**
 * Extract session token from Cookie header
 */
function extractSessionToken(cookieHeader: string | undefined): string | null {
	if (!cookieHeader) {
		return null;
	}

	// Parse cookie header: "better-auth.session_token=TOKEN" or "better-auth.session_token=TOKEN; other=value"
	const match = cookieHeader.match(/better-auth\.session_token=([^;]+)/);
	return match ? match[1] : null;
}

export class UserController {
	/**
	 * Update user profile
	 */
	async updateProfile(c: Context) {
		return handleAsync(
			c,
			async () => {
				let userId: string | null = null;

				// Try Better Auth's getSession first
				const session = await auth.api.getSession({
					headers: c.req.raw.headers,
				});

				if (session?.user?.id) {
					userId = session.user.id;
				} else {
					// Fallback: Extract token from cookie and look up in database
					const cookieHeader = c.req.header("Cookie");
					const sessionToken = extractSessionToken(cookieHeader);

					if (sessionToken) {
						userId = await getUserIdFromToken(sessionToken);
					}
				}

				if (!userId) {
					throw new Error("Unauthorized - Please login first");
				}

				const body = await c.req.json();
				const { name, gender, dob, email } = body;

				const updatedUser = await userService.updateProfile(userId, {
					name,
					gender,
					dob,
					email,
				});

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
				let userId: string | null = null;

				// Try Better Auth's getSession first
				const session = await auth.api.getSession({
					headers: c.req.raw.headers,
				});

				if (session?.user?.id) {
					userId = session.user.id;
				} else {
					// Fallback: Extract token from cookie and look up in database
					const cookieHeader = c.req.header("Cookie");
					const sessionToken = extractSessionToken(cookieHeader);

					if (sessionToken) {
						userId = await getUserIdFromToken(sessionToken);
					}
				}

				if (!userId) {
					throw new Error("Unauthorized - Please login first");
				}

				const user = await userService.getProfile(userId);
				return user;
			},
			"Profile retrieved successfully",
			"Failed to retrieve profile",
		);
	}
}

