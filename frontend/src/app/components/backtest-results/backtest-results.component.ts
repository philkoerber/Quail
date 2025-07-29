import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
    selector: 'app-backtest-results',
    templateUrl: './backtest-results.component.html',
    standalone: false
})
export class BacktestResultsComponent implements OnInit, AfterViewInit {
    @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

    chartOptions: any;
    chart: any;

    // Sample backtest data
    backtestData = {
        strategyName: 'Moving Average Crossover',
        totalReturn: 15.7,
        sharpeRatio: 1.2,
        maxDrawdown: -8.3,
        winRate: 65.2,
        totalTrades: 124,
        period: 'Jan 2023 - Dec 2023'
    };

    ngOnInit() {
        this.initializeChartOptions();
    }

    ngAfterViewInit() {
        this.renderChart();
    }

    initializeChartOptions() {
        // Sample price data for the chart
        const dates = [];
        const prices = [];
        const ma20 = [];
        const ma50 = [];

        // Generate sample data for the last 100 days
        let basePrice = 100;
        for (let i = 0; i < 100; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (100 - i));
            dates.push(date.toISOString().split('T')[0]);

            // Simulate price movement
            basePrice += (Math.random() - 0.5) * 2;
            prices.push(basePrice);

            // Calculate moving averages (simplified)
            if (i >= 19) {
                const ma20Value = prices.slice(i - 19, i + 1).reduce((a, b) => a + b, 0) / 20;
                ma20.push(ma20Value);
            } else {
                ma20.push(null);
            }

            if (i >= 49) {
                const ma50Value = prices.slice(i - 49, i + 1).reduce((a, b) => a + b, 0) / 50;
                ma50.push(ma50Value);
            } else {
                ma50.push(null);
            }
        }

        this.chartOptions = {
            series: [
                {
                    name: 'Price',
                    data: prices
                },
                {
                    name: 'MA 20',
                    data: ma20
                },
                {
                    name: 'MA 50',
                    data: ma50
                }
            ],
            chart: {
                type: 'line',
                height: 400,
                zoom: {
                    enabled: true
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight',
                width: [2, 2, 2]
            },
            title: {
                text: 'Strategy Performance Chart',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: dates,
                type: 'datetime'
            },
            yaxis: {
                title: {
                    text: 'Price ($)'
                }
            },
            colors: ['#2563eb', '#dc2626', '#059669'],
            legend: {
                position: 'top'
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                }
            }
        };
    }

    renderChart() {
        if (this.chartContainer && this.chartContainer.nativeElement) {
            this.chart = new ApexCharts(this.chartContainer.nativeElement, this.chartOptions);
            this.chart.render();
        }
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
} 