# Domain Layer

This folder contains the core business logic, entities, and domain rules. This is the heart of your application.

## What goes here:
- **Entities**: Core business objects with identity
- **Value Objects**: Immutable objects defined by their attributes
- **Domain Services**: Business logic that doesn't naturally fit in a single entity
- **Domain Events**: Events that represent something important happened in the domain
- **Repository Interfaces**: Contracts for data access (implementation goes in infrastructure)

## Example Structure:
```
domain/
├── entities/
│   ├── user.entity.ts
│   └── product.entity.ts
├── value-objects/
│   ├── email.vo.ts
│   └── money.vo.ts
├── services/
│   └── pricing.service.ts
├── events/
│   └── user-created.event.ts
└── repositories/
    └── user.repository.interface.ts
```

## Example Entity:
```typescript
// user.entity.ts
export class User {
  private constructor(
    public readonly id: string,
    public readonly email: Email,
    public readonly name: string,
    private password: string
  ) {}

  static create(data: { email: string; name: string; password: string }): User {
    return new User(
      generateId(),
      Email.create(data.email),
      data.name,
      hashPassword(data.password)
    );
  }

  changePassword(oldPassword: string, newPassword: string): void {
    if (!this.verifyPassword(oldPassword)) {
      throw new Error('Invalid password');
    }
    this.password = hashPassword(newPassword);
  }
}
```

