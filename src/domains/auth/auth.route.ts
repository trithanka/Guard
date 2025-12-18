import { OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";
import { AuthController } from "./auth.controller";

const authRouter = new OpenAPIHono();
const authController = new AuthController();

// Send OTP to phone number
authRouter.openapi(
	{
		method: "post",
		path: "/send-otp",
		summary: "Send OTP to phone number",
		tags: ["Auth"],
		request: {
			body: {
				content: {
					"application/json": {
						schema: z.object({
							phoneNumber: z.string().length(10).describe("Phone number to send OTP to"),
						}),
					},
				},
			},
		},
		responses: {
			200: {
				description: "OTP sent successfully",
			},
		},
	},
	(c) => authController.sendOTP(c)
);

// Verify OTP
authRouter.openapi(
	{
		method: "post",
		path: "/verify-otp",
		summary: "Verify OTP code",
		tags: ["Auth"],
		request: {
			body: {
				content: {
					"application/json": {
						schema: z.object({
							phoneNumber: z.string().describe("Phone number"),
							code: z.string().describe("OTP code to verify"),
						}),
					},
				},
			},
		},
		responses: {
			200: {
				description: "Phone number verified successfully",
			},
		},
	},
	(c) => authController.verifyOTP(c)
);

export default authRouter;
