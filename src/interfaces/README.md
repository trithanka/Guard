# Interfaces Layer

This folder contains the entry points of your application - API routes, controllers, and request/response handling.

## What goes here:
- **Controllers**: Handle HTTP requests and responses
- **Routes**: Define API endpoints
- **Middleware**: Request/response middleware (auth, validation, etc.)
- **Request/Response DTOs**: Data structures for API communication
- **Validators**: Request validation schemas

## Example Structure:
```
interfaces/
├── http/
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   └── auth.controller.ts
│   ├── routes/
│   │   ├── user.routes.ts
│   │   └── auth.routes.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── validation.middleware.ts
│   └── dto/
│       ├── create-user-request.dto.ts
│       └── user-response.dto.ts
└── validators/
    └── user.validator.ts
```

## Example Controller:
```typescript
// user.controller.ts
import { Hono } from 'hono';
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(c: Context) {
    const body = await c.req.json();
    const user = await this.createUserUseCase.execute(body);
    return c.json({ id: user.id, email: user.email.value, name: user.name }, 201);
  }

  async getById(c: Context) {
    const id = c.req.param('id');
    // ... fetch user logic
    return c.json(user);
  }
}
```

## Example Routes:
```typescript
// user.routes.ts
import { Hono } from 'hono';
import { UserController } from './controllers/user.controller';

const router = new Hono();
const userController = new UserController(/* dependencies */);

router.post('/users', (c) => userController.create(c));
router.get('/users/:id', (c) => userController.getById(c));

export default router;
```

