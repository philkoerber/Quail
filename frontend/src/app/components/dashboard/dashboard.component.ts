import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-dashboard',
    template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">Welcome back, {{ user?.firstName }}!</p>
      </div>

      <!-- Quick Actions -->
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Strategies</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.strategies }}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <a routerLink="/strategies" class="font-medium text-primary-700 hover:text-primary-900">
                  View all strategies
                </a>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Backtests</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.backtests }}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <a href="#" class="font-medium text-primary-700 hover:text-primary-900">
                  View backtest results
                </a>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Active Strategies</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.activeStrategies }}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <a routerLink="/strategies/new" class="font-medium text-primary-700 hover:text-primary-900">
                  Create new strategy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="px-4 py-6 sm:px-0">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li *ngFor="let activity of recentActivity" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <svg class="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                    <p class="text-sm text-gray-500">{{ activity.description }}</p>
                  </div>
                </div>
                <div class="text-sm text-gray-500">{{ activity.time }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
    user: any;
    stats = {
        strategies: 0,
        backtests: 0,
        activeStrategies: 0,
    };
    recentActivity = [
        {
            title: 'Strategy Created',
            description: 'Moving Average Crossover strategy was created',
            time: '2 hours ago',
        },
        {
            title: 'Backtest Completed',
            description: 'Backtest for Strategy #1 completed with 15% return',
            time: '1 day ago',
        },
    ];

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.user = this.authService.currentUserValue;
        // In a real app, you would fetch stats and recent activity from the API
    }
} 