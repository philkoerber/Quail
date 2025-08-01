import { IsUUID, IsOptional } from 'class-validator';

export class IdParamDto {
    @IsUUID(4, { message: 'ID must be a valid UUID' })
    id: string;
}

export class PaginationDto {
    @IsOptional()
    page?: number = 1;

    @IsOptional()
    limit?: number = 10;
}

export class ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export class PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
} 