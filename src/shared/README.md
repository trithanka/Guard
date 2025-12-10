# Shared Layer

This folder contains shared utilities, constants, helpers, and common code used across all layers.

## What goes here:
- **Utilities**: Helper functions (date formatting, string manipulation, etc.)
- **Constants**: Application-wide constants
- **Types**: Shared TypeScript types and interfaces
- **Helpers**: Reusable helper functions
- **Errors**: Custom error classes
- **Validators**: Shared validation utilities

## Example Structure:
```
shared/
├── utils/
│   ├── date.util.ts
│   ├── string.util.ts
│   └── crypto.util.ts
├── constants/
│   ├── http-status.constants.ts
│   └── error-codes.constants.ts
├── types/
│   └── common.types.ts
├── errors/
│   ├── app.error.ts
│   └── validation.error.ts
└── helpers/
    └── response.helper.ts
```

## Example Utilities:
```typescript
// date.util.ts
export class DateUtil {
  static format(date: Date, format: string = 'YYYY-MM-DD'): string {
    // Date formatting logic
    return formattedDate;
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
```

## Example Constants:
```typescript
// http-status.constants.ts
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
```

## Example Error:
```typescript
// app.error.ts
export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

