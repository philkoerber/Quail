import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Strategy {
    id: string;
    name: string;
    description?: string;
    code: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface StrategyStats {
    totalStrategies: number;
    activeStrategies: number;
}

@Injectable({
    providedIn: 'root'
})
export class StrategyService {
    private apiUrl = 'http://localhost:3000/strategies';

    constructor(private http: HttpClient) { }

    getStrategies(): Observable<Strategy[]> {
        return this.http.get<Strategy[]>(this.apiUrl);
    }

    getStrategy(id: string): Observable<Strategy> {
        return this.http.get<Strategy>(`${this.apiUrl}/${id}`);
    }

    createStrategy(strategy: Partial<Strategy>): Observable<Strategy> {
        return this.http.post<Strategy>(this.apiUrl, strategy);
    }

    updateStrategy(id: string, strategy: Partial<Strategy>): Observable<Strategy> {
        return this.http.put<Strategy>(`${this.apiUrl}/${id}`, strategy);
    }

    deleteStrategy(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getStats(): Observable<StrategyStats> {
        return this.http.get<StrategyStats>(`${this.apiUrl}/stats`);
    }
}
