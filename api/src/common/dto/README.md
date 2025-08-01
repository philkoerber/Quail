# DTOs (Data Transfer Objects) - Modular Structure

This project follows the **modular DTO approach**, which is the most common pattern in NestJS applications.

## Structure

### Module-Specific DTOs
Each module contains its own DTOs in a `dto/` subfolder:

```
src/
├── auth/
│   ├── dto/
│   │   ├── auth.dto.ts      # RegisterDto, LoginDto, RefreshTokenDto
│   │   └── index.ts
│   ├── auth.controller.ts
│   └── auth.service.ts
├── strategy/
│   ├── dto/
│   │   ├── strategy.dto.ts  # CreateStrategyDto, UpdateStrategyDto
│   │   └── index.ts
│   ├── strategy.controller.ts
│   └── strategy.service.ts
├── backtest/
│   ├── dto/
│   │   ├── backtest.dto.ts  # CreateBacktestDto, UpdateBacktestDto
│   │   └── index.ts
│   ├── backtest.controller.ts
│   └── backtest.service.ts
└── common/
    └── dto/
        ├── common.dto.ts    # IdParamDto, PaginationDto, ApiResponse
        ├── response.dto.ts  # Response DTOs
        └── index.ts
```

### Shared DTOs
The `common/dto/` folder contains DTOs that are used across multiple modules:

- **`IdParamDto`**: For route parameters requiring UUID
- **`PaginationDto`**: For paginated requests
- **`ApiResponse<T>`**: Generic API response wrapper
- **`PaginatedResponse<T>`**: For paginated responses
- **Response DTOs**: `UserResponseDto`, `StrategyResponseDto`, etc.

## Benefits of This Approach

1. **Modularity**: Each module is self-contained
2. **Co-location**: DTOs are close to where they're used
3. **Clear ownership**: Easy to see which DTOs belong to which module
4. **Easier imports**: Shorter relative import paths
5. **Better encapsulation**: Module-specific DTOs stay with their module
6. **Scalability**: Easy to add new modules without affecting others

## Usage Examples

### In Controllers
```typescript
// Module-specific DTOs
import { CreateStrategyDto, UpdateStrategyDto } from './dto';

// Shared DTOs
import { IdParamDto } from '../common/dto';

@Post()
async create(@Body() strategyData: CreateStrategyDto) {
    // strategyData is validated and typed
}
```

### Cross-Module Usage
If you need to use a DTO from another module:

```typescript
// Import from another module
import { RegisterDto } from '../auth/dto';

// Import shared DTOs
import { IdParamDto, UserResponseDto } from '../common/dto';
```

## When to Use Each Approach

### Use Module-Specific DTOs When:
- The DTO is only used within one module
- You want to keep modules self-contained
- The DTO is specific to that module's domain

### Use Shared DTOs When:
- The DTO is used across multiple modules
- It's a common pattern (like ID parameters)
- It's a generic utility (like pagination)

## Best Practices

1. **Keep DTOs close to their usage** - Put them in the module's `dto/` folder
2. **Use index.ts files** - For clean imports
3. **Share common patterns** - Put reusable DTOs in `common/dto/`
4. **Be specific with naming** - Use clear, descriptive names
5. **Document validation rules** - Use meaningful error messages

This structure scales well and follows NestJS best practices! 