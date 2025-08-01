import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/auth';
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser$: Observable<User | null>;
    public isAuthenticated$: Observable<boolean>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User | null>(
            this.getUserFromStorage()
        );
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.isAuthenticated$ = this.currentUser$.pipe(
            map(user => !!user)
        );
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    register(userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData);
    }

    login(credentials: { email: string; password: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
            .pipe(
                map(response => {
                    this.setUserAndTokens(response);
                    return response;
                })
            );
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.currentUserSubject.next(null);
    }

    refreshToken(): Observable<AuthResponse> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken })
            .pipe(
                map(response => {
                    this.setUserAndTokens(response);
                    return response;
                })
            );
    }

    private setUserAndTokens(response: AuthResponse) {
        if (response.user && response.accessToken && response.refreshToken) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            this.currentUserSubject.next(response.user);
        } else {
            console.error('Invalid auth response received:', response);
            this.logout();
        }
    }

    private getUserFromStorage(): User | null {
        const userStr = localStorage.getItem('currentUser');
        if (!userStr || userStr === 'undefined' || userStr === 'null') {
            return null;
        }
        try {
            return JSON.parse(userStr);
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            // Clear invalid data
            localStorage.removeItem('currentUser');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return null;
        }
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }
} 