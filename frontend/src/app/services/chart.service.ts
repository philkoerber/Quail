import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChartService {

    constructor() { }

    createLineChart(data: number[], categories: string[], title: string = 'Chart') {
        return {
            series: [{ name: 'Data', data: data }],
            chart: {
                type: 'line',
                height: 400,
                zoom: { enabled: true },
                toolbar: { show: true }
            },
            stroke: { curve: 'straight', width: 2 },
            title: { text: title, align: 'left' },
            xaxis: { categories: categories },
            yaxis: { title: { text: 'Value' } },
            colors: ['#2563eb']
        };
    }

    createAreaChart(data: number[], categories: string[], title: string = 'Chart') {
        return {
            series: [{ name: 'Data', data: data }],
            chart: {
                type: 'area',
                height: 300,
                toolbar: { show: false }
            },
            stroke: { curve: 'smooth', width: 2 },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.2
                }
            },
            title: { text: title, align: 'left' },
            xaxis: { categories: categories },
            colors: ['#10b981']
        };
    }

    createCandlestickChart(data: any[], title: string = 'Candlestick Chart') {
        return {
            series: [{ data: data }],
            chart: {
                type: 'candlestick',
                height: 400,
                toolbar: { show: false }
            },
            title: { text: title, align: 'left' },
            xaxis: { type: 'datetime' }
        };
    }
} 