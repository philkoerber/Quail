import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChartService {

    constructor() { }

    /**
     * Creates a line chart configuration for price data
     */
    createPriceChart(data: any[], categories: string[], title: string = 'Price Chart') {
        return {
            series: [
                {
                    name: 'Price',
                    data: data
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
                width: 2
            },
            title: {
                text: title,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: categories,
                type: 'datetime'
            },
            yaxis: {
                title: {
                    text: 'Price ($)'
                }
            },
            colors: ['#2563eb'],
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

    /**
     * Creates a candlestick chart configuration for OHLC data
     */
    createCandlestickChart(data: any[], categories: string[], title: string = 'Candlestick Chart') {
        return {
            series: [{
                data: data
            }],
            chart: {
                type: 'candlestick',
                height: 400,
                id: 'candles',
                toolbar: {
                    autoSelected: 'pan',
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            title: {
                text: title,
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        };
    }

    /**
     * Creates a performance area chart for portfolio value
     */
    createPerformanceChart(data: number[], categories: string[], title: string = 'Performance Chart') {
        return {
            series: [{
                name: 'Portfolio Value',
                data: data
            }],
            chart: {
                type: 'area',
                height: 300,
                toolbar: {
                    show: false
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
                categories: categories
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
            },
            title: {
                text: title,
                align: 'left'
            }
        };
    }

    /**
     * Creates a returns distribution histogram
     */
    createReturnsDistributionChart(data: number[], title: string = 'Returns Distribution') {
        return {
            series: [{
                name: 'Returns',
                data: data
            }],
            chart: {
                type: 'histogram',
                height: 300,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                title: {
                    text: 'Return (%)'
                }
            },
            yaxis: {
                title: {
                    text: 'Frequency'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return val + ' occurrences';
                    }
                }
            },
            title: {
                text: title,
                align: 'left'
            }
        };
    }

    /**
     * Creates a drawdown chart
     */
    createDrawdownChart(data: number[], categories: string[], title: string = 'Drawdown Analysis') {
        return {
            series: [{
                name: 'Drawdown',
                data: data
            }],
            chart: {
                type: 'area',
                height: 300,
                toolbar: {
                    show: false
                }
            },
            stroke: {
                curve: 'straight',
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
            colors: ['#ef4444'],
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: categories,
                type: 'datetime'
            },
            yaxis: {
                title: {
                    text: 'Drawdown (%)'
                },
                labels: {
                    formatter: function (val: number) {
                        return val.toFixed(1) + '%';
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return val.toFixed(2) + '%';
                    }
                }
            },
            title: {
                text: title,
                align: 'left'
            }
        };
    }
} 