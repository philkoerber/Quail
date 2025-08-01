import { Exclude, Expose, Transform } from 'class-transformer';

export class UserResponseDto {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Exclude()
    password: string;
}

export class StrategyResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    code: string;

    @Expose()
    isActive: boolean;

    @Expose()
    userId: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}

export class BacktestResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    results: Record<string, any>;

    @Expose()
    status: 'running' | 'completed' | 'failed';

    @Expose()
    userId: string;

    @Expose()
    strategyId: string;

    @Expose()
    createdAt: Date;
}

export class AuthResponseDto {
    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;

    @Expose()
    user: UserResponseDto;
} 