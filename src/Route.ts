import type { OpenAPIHono } from '@hono/zod-openapi';
import authRouter from './domains/auth/auth.route';
import betterAuthRouter from './domains/auth/better-auth.route';
import bookingsRouter from './domains/bookings/routes';
import paymentsRouter from './domains/payments/routes';
import userRouter from './domains/user/user.route';

/**
 * Global route configuration
 * Aggregates all route files from different domains
 */
export const routes: Array<{ path: string; router: OpenAPIHono }> = [
	{
		path: '/api/auth/better-auth',
		router: betterAuthRouter,
	},
	{
		path: '/api/auth',
		router: authRouter,
	},
	{
		path: '/api/user',
		router: userRouter,
	},
	{
		path: '/api/bookings',
		router: bookingsRouter,
	},
	{
		path: '/api/payments',
		router: paymentsRouter,
	},
];

export default routes;

