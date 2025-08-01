import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Skip adding token for auth endpoints
    if (request.url.includes('/auth/')) {
        return next(request);
    }

    const token = authService.getAccessToken();

    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !request.url.includes('/auth/refresh')) {
                return handle401Error(request, next, authService, router);
            }
            return throwError(() => error);
        })
    );
};

function handle401Error(
    request: any,
    next: any,
    authService: AuthService,
    router: Router
): Observable<any> {
    if (!isRefreshing) {
        isRefreshing = true;

        return authService.refreshToken().pipe(
            switchMap((response) => {
                isRefreshing = false;

                // Retry the original request with the new token
                const newToken = authService.getAccessToken();
                if (newToken) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${newToken}`
                        }
                    });
                }

                return next(request);
            }),
            catchError((error) => {
                isRefreshing = false;
                authService.logout();
                router.navigate(['/login']);
                return throwError(() => error);
            })
        );
    }

    // If already refreshing, just retry the request
    return next(request);
} 