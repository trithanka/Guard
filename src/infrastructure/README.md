# Infrastructure Layer

This folder contains implementations of external concerns and technical details.

## What goes here:
- **Database Repositories**: Concrete implementations of domain repository interfaces
- **External Services**: API clients, third-party integrations
- **Database Models/Schemas**: Database-specific models (e.g., Prisma, TypeORM)
- **Configurations**: Database configs, external service configs
- **Adapters**: Adapters for external libraries and services

## Example Structure:
```
infrastructure/
├── database/
│   ├── repositories/
│   │   └── user.repository.ts
│   ├── models/
│   │   └── user.model.ts
│   └── migrations/
├── external/
│   ├── email/
│   │   └── sendgrid.service.ts
│   └── payment/
│       └── stripe.service.ts
└── config/
    └── database.config.ts
```

## Example Repository Implementation:
```typescript
// user.repository.ts
import { IUserRepository } from '@/domain/repositories/user.repository.interface';
import { User } from '@/domain/entities/user.entity';
import { PrismaClient } from '@prisma/client';

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email.value,
        name: user.name,
        // ...
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { id } });
    return data ? this.toDomain(data) : null;
  }
}
```

