import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    selector: 'app-strategy-detail',
    templateUrl: './strategy-detail.component.html',
    standalone: false
})
export class StrategyDetailComponent implements OnInit {
    strategy: Strategy | null = null;
    loading = true;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) { }

    ngOnInit() {
        const strategyId = this.route.snapshot.paramMap.get('id');
        if (strategyId) {
            this.loadStrategy(strategyId);
        }
    }

    loadStrategy(id: string) {
        this.http.get<Strategy>(`http://localhost:3000/strategies/${id}`)
            .subscribe({
                next: (strategy) => {
                    this.strategy = strategy;
                    this.loading = false;
                },
                error: (error) => {
                    this.error = 'Failed to load strategy';
                    this.loading = false;
                    console.error('Error loading strategy:', error);
                }
            });
    }

    editStrategy() {
        if (this.strategy) {
            this.router.navigate(['/strategies', this.strategy.id, 'edit']);
        }
    }

    deleteStrategy() {
        if (!this.strategy || !confirm('Are you sure you want to delete this strategy?')) {
            return;
        }

        this.http.delete(`http://localhost:3000/strategies/${this.strategy.id}`)
            .subscribe({
                next: () => {
                    this.router.navigate(['/strategies']);
                },
                error: (error) => {
                    this.error = 'Failed to delete strategy';
                    console.error('Error deleting strategy:', error);
                }
            });
    }
} 