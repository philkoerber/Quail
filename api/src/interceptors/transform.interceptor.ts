import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export interface Response<T> {
    data: T;
    message?: string;
    success: boolean;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    constructor(private readonly responseClass?: new () => T) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map(data => {
                if (this.responseClass && data) {
                    const transformedData = plainToClass(this.responseClass, data, {
                        excludeExtraneousValues: true,
                    });
                    return {
                        success: true,
                        data: transformedData,
                    };
                }
                return {
                    success: true,
                    data,
                };
            }),
        );
    }
} 