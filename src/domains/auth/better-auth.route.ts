import { OpenAPIHono } from "@hono/zod-openapi";
import { auth } from "../../lib/auth";

/**
 * Better Auth handler route for Expo and other clients
 * This route handles all Better Auth API requests
 * Mounted at /api/auth/better-auth/*
 */
const betterAuthRouter = new OpenAPIHono();

// Mount Better Auth handler for all methods and paths
betterAuthRouter.all("*", async (c) => {
	const response = await auth.handler(c.req.raw);
	return response;
});

export default betterAuthRouter;

