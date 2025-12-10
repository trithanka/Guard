# Application Layer

This folder contains the application logic and use cases (business workflows) of the application.

## What goes here:
- **Use Cases / Application Services**: Orchestrate domain logic to fulfill business requirements
- **DTOs (Data Transfer Objects)**: Data structures for transferring data between layers
- **Application-specific interfaces**: Contracts for application services

## Example Structure:
```
application/
├── use-cases/
│   ├── user/
│   │   ├── create-user.use-case.ts
│   │   ├── get-user.use-case.ts
│   │   └── update-user.use-case.ts
├── dto/
│   ├── user.dto.ts
│   └── auth.dto.ts
└── services/
    └── user-application.service.ts
```

## Example Use Case:
```typescript
// create-user.use-case.ts
export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const user = User.create(data);
    await this.userRepository.save(user);
    await this.emailService.sendWelcomeEmail(user.email);
    return user;
  }
}
```

