import type { OpenAPIHono } from "@hono/zod-openapi";
import packageJSON = require('../../package.json');
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenAPI(app: OpenAPIHono) {
    // The OpenAPI documentation will be available at /doc
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: packageJSON.version,
            title: packageJSON.name,
        },
    })

    app.get(
        '/doc-view',
        Scalar({
          url: '/doc',
          theme: 'kepler',
          layout: 'classic',
        })
      )
      
}