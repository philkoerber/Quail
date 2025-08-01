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

interface Backtest {
    id: string;
    name: string;
    results: any;
    status: 'running' | 'completed' | 'failed';
    createdAt: string;
}

@Component({
    selector: 'app-strategy-detail',
    templateUrl: './strategy-detail.component.html',
    standalone: false
})
export class StrategyDetailComponent implements OnInit {
    strategy: Strategy | null = null;
    backtest: Backtest | null = null;
    loading = true;
    backtestLoading = false;
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
            this.loadBacktest(strategyId);
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

    private loadBacktest(strategyId: string) {
        this.http.get<Backtest[]>(`http://localhost:3000/backtests?strategyId=${strategyId}`)
            .subscribe({
                next: (backtests) => {
                    // Get the most recent completed backtest
                    this.backtest = backtests
                        .filter(bt => bt.status === 'completed')
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null;
                },
                error: (error) => {
                    console.error('Error loading backtest:', error);
                }
            });
    }

    runBacktest() {
        if (!this.strategy) return;

        this.backtestLoading = true;
        this.error = '';

        const backtestData = {
            name: `Backtest for ${this.strategy.name}`,
            strategyId: this.strategy.id
        };

        this.http.post('http://localhost:3000/backtests', backtestData)
            .subscribe({
                next: (backtest) => {
                    this.backtestLoading = false;
                    // Reload backtest after a short delay to check status
                    setTimeout(() => this.loadBacktest(this.strategy!.id), 2000);
                },
                error: (error) => {
                    this.backtestLoading = false;
                    this.error = 'Failed to start backtest';
                    console.error('Error starting backtest:', error);
                }
            });
    }

    improveStrategy() {
        // TODO: Implement LLM-based strategy improvement
        alert('Strategy improvement feature coming soon!');
    }
} 