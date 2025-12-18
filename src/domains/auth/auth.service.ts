import { auth } from "../../lib/auth";

export class AuthService {
	/**
	 * Send OTP to phone number
	 */
	async sendOTP(phoneNumber: string) {
		if (!phoneNumber) {
			throw new Error("Phone number is required");
		}

		const result = await auth.api.sendPhoneNumberOTP({
			body: {
				phoneNumber: phoneNumber,
			},
		});

		return result;
	}

	/**
	 * Verify OTP code
	 */
	async verifyOTP(phoneNumber: string, code: string) {
		if (!phoneNumber || !code) {
			throw new Error("Phone number and code are required");
		}

		const result = await auth.api.verifyPhoneNumber({
			body: {
				phoneNumber: phoneNumber,
				code: code,
			},
		});

		return result;
	}
}
