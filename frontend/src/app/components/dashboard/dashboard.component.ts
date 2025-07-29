import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: false
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