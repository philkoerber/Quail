import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateBacktestDto {
    @IsUUID(4, { message: 'Strategy ID must be a valid UUID' })
    @IsNotEmpty({ message: 'Strategy ID is required' })
    strategyId: string;

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}

export class UpdateBacktestDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Status must be a string' })
    status?: 'running' | 'completed' | 'failed';
} 