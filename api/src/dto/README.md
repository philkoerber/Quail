# DTOs (Data Transfer Objects)

This directory contains all the Data Transfer Objects used throughout the API for type safety and validation.

## Structure

### Auth DTOs (`auth.dto.ts`)
- `RegisterDto`: For user registration
- `LoginDto`: For user login
- `RefreshTokenDto`: For token refresh

### Strategy DTOs (`strategy.dto.ts`)
- `CreateStrategyDto`: For creating new strategies
- `UpdateStrategyDto`: For updating existing strategies

### Backtest DTOs (`backtest.dto.ts`)
- `CreateBacktestDto`: For creating new backtests
- `UpdateBacktestDto`: For updating existing backtests

### Common DTOs (`common.dto.ts`)
- `IdParamDto`: For route parameters requiring UUID
- `PaginationDto`: For paginated requests
- `ApiResponse<T>`: Generic API response wrapper
- `PaginatedResponse<T>`: For paginated responses

### Response DTOs (`response.dto.ts`)
- `UserResponseDto`: User data in responses (excludes password)
- `StrategyResponseDto`: Strategy data in responses
- `BacktestResponseDto`: Backtest data in responses
- `AuthResponseDto`: Authentication response data

## Validation

All DTOs use `class-validator` decorators for automatic validation:

- `@IsEmail()`: Validates email format
- `@IsString()`: Ensures string type
- `@IsNotEmpty()`: Ensures non-empty value
- `@MinLength()`: Minimum string length
- `@IsUUID()`: Validates UUID format
- `@IsOptional()`: Makes field optional
- `@IsBoolean()`: Ensures boolean type

## Usage

### In Controllers
```typescript
import { CreateStrategyDto, UpdateStrategyDto } from '../dto';

@Post()
async create(@Body() strategyData: CreateStrategyDto) {
    // strategyData is now validated and typed
}
```

### Response Transformation
```typescript
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { StrategyResponseDto } from '../dto';

@UseInterceptors(new TransformInterceptor(StrategyResponseDto))
@Get()
async findAll() {
    // Response will be automatically transformed
}
```

## Benefits

1. **Type Safety**: All request/response data is properly typed
2. **Validation**: Automatic validation of incoming data
3. **Documentation**: Clear structure of expected data
4. **Consistency**: Standardized API responses
5. **Security**: Automatic filtering of unwanted properties 