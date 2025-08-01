import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(ValidationError)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationError[], host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const errors = this.flattenValidationErrors(exception);

        response.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
    }

    private flattenValidationErrors(errors: ValidationError[]): string[] {
        const messages: string[] = [];

        errors.forEach(error => {
            if (error.constraints) {
                messages.push(...Object.values(error.constraints));
            }
            if (error.children) {
                messages.push(...this.flattenValidationErrors(error.children));
            }
        });

        return messages;
    }
} 