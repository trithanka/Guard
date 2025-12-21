import type { Context } from "hono";
import { handleAsync, success, error } from "../../utils/response";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
	/**
	 * Send OTP to phone number
	 */
	async sendOTP(c: Context) {
		return handleAsync(
			c,
			async () => {
				const { phoneNumber } = await c.req.json();
				return await authService.sendOTP(phoneNumber);
			},
			"OTP sent successfully",
			"Failed to send OTP",
		);
	}

	/**
	 * Verify OTP code
	 */
	async verifyOTP(c: Context) {
		try {
			const { phoneNumber, code } = await c.req.json();
			const result = await authService.verifyOTP(phoneNumber, code);

			// Extract the session token from the result
			// Better Auth returns { status: true, token: "...", user: {...} }
			const sessionToken = result?.token;

			// Set the session cookie if token exists
			if (sessionToken) {
				// Better Auth uses this cookie name format
				c.header(
					"Set-Cookie",
					`better-auth.session_token=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Secure=false`
				);
			}

			return c.json(
				{
					success: true,
					message: "Phone number verified successfully",
					data: result,
				},
				200
			);
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Failed to verify OTP";
			return c.json(
				{
					success: false,
					error: message,
				},
				400
			);
		}
	}
}
