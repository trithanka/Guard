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
		return handleAsync(
			c,
			async () => {
				const { phoneNumber, code } = await c.req.json();
				return await authService.verifyOTP(phoneNumber, code);
			},
			"Phone number verified successfully",
			"Failed to verify OTP",
		);
	}
}
