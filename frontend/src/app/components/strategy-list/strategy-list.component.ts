import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

interface Strategy {
    id: string;
    name: string;
    description: string;
    code: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

@Component({
    selector: 'app-strategy-list',
    templateUrl: './strategy-list.component.html',
    standalone: false
})
export class StrategyListComponent implements OnInit {
    strategies: Strategy[] = [];
    loading = true;
    error = '';

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.loadStrategies();
    }

    loadStrategies() {
        this.http.get<Strategy[]>(`http://localhost:3000/strategies`)
            .subscribe({
                next: (strategies) => {
                    this.strategies = strategies;
                    this.loading = false;
                },
                error: (error) => {
                    this.error = 'Failed to load strategies';
                    this.loading = false;
                    console.error('Error loading strategies:', error);
                }
            });
    }

    viewStrategy(strategyId: string) {
        this.router.navigate(['/strategies', strategyId]);
    }

    editStrategy(strategyId: string) {
        this.router.navigate(['/strategies', strategyId, 'edit']);
    }

    deleteStrategy(strategyId: string) {
        if (!confirm('Are you sure you want to delete this strategy?')) {
            return;
        }

        this.http.delete(`http://localhost:3000/strategies/${strategyId}`)
            .subscribe({
                next: () => {
                    this.loadStrategies(); // Reload the list
                },
                error: (error) => {
                    this.error = 'Failed to delete strategy';
                    console.error('Error deleting strategy:', error);
                }
            });
    }
} 