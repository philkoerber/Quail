import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChartService } from '../../services/chart.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('performanceChart', { static: false }) performanceChart!: ElementRef;

  user: any;
  chart: any;
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
    private chartService: ChartService
  ) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  ngAfterViewInit() {
    this.renderPerformanceChart();
  }

  renderPerformanceChart() {
    if (this.performanceChart && this.performanceChart.nativeElement) {
      const data = [10000, 10200, 10500, 10300, 10800, 11200, 11500, 11800, 12000, 12200, 12500, 12800];
      const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const options = this.chartService.createAreaChart(data, categories, 'Portfolio Performance');
      this.chart = new ApexCharts(this.performanceChart.nativeElement, options);
      this.chart.render();
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
} 