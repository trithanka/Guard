import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from 'hono/logger';
import type { Hono } from 'hono';

/**
 * Create a configured OpenAPIHono application instance
 * @param options Configuration options for the app
 * @returns Configured OpenAPIHono instance
 */
export function createApp(options?: {
	enableLogger?: boolean;
	routes?: Array<{ path: string; router: Hono }>;
}) {
	const app = new OpenAPIHono();

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

