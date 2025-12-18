import { createApp } from './lib/app';
import configureOpenAPI from './lib/configure-open-api';
import { routes } from './Route';

const app = createApp({
	enableLogger: true,
	routes,
});

configureOpenAPI(app);

export default app;