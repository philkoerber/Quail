import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
  ) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    // In a real app, you would fetch stats and recent activity from the API
  }

  ngAfterViewInit() {
    this.renderPerformanceChart();
  }

  renderPerformanceChart() {
    if (this.performanceChart && this.performanceChart.nativeElement) {
      const options = {
        series: [{
          name: 'Portfolio Value',
          data: [10000, 10200, 10500, 10300, 10800, 11200, 11500, 11800, 12000, 12200, 12500, 12800]
        }],
        chart: {
          type: 'area',
          height: 200,
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100]
          }
        },
        colors: ['#10b981'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
          labels: {
            formatter: function (val: number) {
              return '$' + val.toLocaleString();
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val: number) {
              return '$' + val.toLocaleString();
            }
          }
        }
      };

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