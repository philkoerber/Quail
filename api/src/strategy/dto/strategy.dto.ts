import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateStrategyDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsString({ message: 'Code must be a string' })
    @IsNotEmpty({ message: 'Code is required' })
    code: string;
}

export class UpdateStrategyDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Code must be a string' })
    code?: string;

    @IsOptional()
    @IsBoolean({ message: 'isActive must be a boolean' })
    isActive?: boolean;
} 