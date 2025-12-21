import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

/**
 * Create a configured OpenAPIHono application instance
 * @param options Configuration options for the app
 * @returns Configured OpenAPIHono instance
 */
export function createApp(options?: {
	enableLogger?: boolean;
	routes?: Array<{ path: string; router: OpenAPIHono }>;
}) {
	const app = new OpenAPIHono();

	// Add CORS middleware for Expo/React Native
	app.use('*', cors({
		origin: '*', // Allow all origins in development
		allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
		exposeHeaders: ['Content-Type'],
		credentials: true,
	}));

	// Add logger middleware if enabled (default: true)
	if (options?.enableLogger !== false) {
		app.use(logger());
	}

	// Mount routes if provided
	if (options?.routes) {
		for (const route of options.routes) {
			app.route(route.path, route.router);
		}
	}

	return app;
}

