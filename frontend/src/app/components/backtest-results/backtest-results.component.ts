import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import ApexCharts from 'apexcharts';

@Component({
    selector: 'app-backtest-results',
    templateUrl: './backtest-results.component.html',
    standalone: false
})
export class BacktestResultsComponent implements OnInit, AfterViewInit {
    @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

    chart: any;

    backtestData = {
        strategyName: 'Moving Average Crossover',
        totalReturn: 15.7,
        sharpeRatio: 1.2,
        maxDrawdown: -8.3,
        winRate: 65.2,
        totalTrades: 124,
        period: 'Jan 2023 - Dec 2023'
    };

    constructor(private chartService: ChartService) { }

    ngOnInit() {
        // Component initialization
    }

    ngAfterViewInit() {
        this.renderChart();
    }

    renderChart() {
        if (this.chartContainer && this.chartContainer.nativeElement) {
            // Generate sample price data
            const prices = this.generatePriceData();
            const dates = this.generateDates();

            const options = this.chartService.createLineChart(
                prices,
                dates,
                'Strategy Performance Chart'
            );

            this.chart = new ApexCharts(this.chartContainer.nativeElement, options);
            this.chart.render();
        }
    }

    private generatePriceData(): number[] {
        const data = [];
        let price = 100;
        for (let i = 0; i < 100; i++) {
            price += (Math.random() - 0.5) * 2;
            data.push(price);
        }
        return data;
    }

    private generateDates(): string[] {
        const dates = [];
        for (let i = 99; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
} 