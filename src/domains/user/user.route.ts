import { OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";
import { UserController } from "./user.controller";

const userRouter = new OpenAPIHono();
const userController = new UserController();

// Update user profile
userRouter.openapi(
	{
		method: "patch",
		path: "/profile",
		summary: "Update user profile",
		tags: ["User"],
		request: {
			body: {
				content: {
					"application/json": {
						schema: z.object({
							name: z.string().optional().describe("User's full name"),
							gender: z
								.string()
								.max(20)
								.optional()
								.describe("User's gender (e.g., male, female, other)"),
							dob: z
								.string()
								.date()
								.optional()
								.describe("Date of birth in ISO format (YYYY-MM-DD)"),
							email: z
								.string()
								.email()
								.optional()
								.describe("User's email address"),
						}),
					},
				},
			},
		},
		responses: {
			200: {
				description: "Profile updated successfully",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							message: z.string(),
							data: z.object({
								id: z.string(),
								name: z.string().nullable(),
								email: z.string().nullable(),
								gender: z.string().nullable(),
								dob: z.string().nullable(),
								phoneNumber: z.string().nullable(),
							}),
						}),
					},
				},
			},
			401: {
				description: "Unauthorized",
			},
		},
	},
	(c) => userController.updateProfile(c)
);

// Get user profile
userRouter.openapi(
	{
		method: "get",
		path: "/profile",
		summary: "Get current user profile",
		tags: ["User"],
		responses: {
			200: {
				description: "Profile retrieved successfully",
				content: {
					"application/json": {
						schema: z.object({
							success: z.boolean(),
							message: z.string(),
							data: z.object({
								id: z.string(),
								name: z.string().nullable(),
								email: z.string().nullable(),
								gender: z.string().nullable(),
								dob: z.string().nullable(),
								phoneNumber: z.string().nullable(),
								phoneNumberVerified: z.boolean(),
								emailVerified: z.boolean(),
							}),
						}),
					},
				},
			},
			401: {
				description: "Unauthorized",
			},
		},
	},
	(c) => userController.getProfile(c)
);

export default userRouter;

