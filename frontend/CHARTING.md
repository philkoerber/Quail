# Charting Implementation with ApexCharts

This project uses **ApexCharts** for all charting needs. ApexCharts is a modern, responsive charting library that provides excellent performance and customization options.

## Installation

ApexCharts is already installed in this project:

```bash
npm install apexcharts
```

## Usage

### Basic Chart Implementation

To use ApexCharts in a component:

1. **Import ApexCharts**:
```typescript
import ApexCharts from 'apexcharts';
```

2. **Add a chart container** in your HTML:
```html
<div #chartContainer class="w-full"></div>
```

3. **Create and render the chart** in your component:
```typescript
@ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

ngAfterViewInit() {
  const options = {
    series: [{
      name: 'Data',
      data: [10, 20, 30, 40, 50]
    }],
    chart: {
      type: 'line',
      height: 400
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    }
  };

  const chart = new ApexCharts(this.chartContainer.nativeElement, options);
  chart.render();
}
```

### Using the Chart Service

We've created a `ChartService` that provides pre-configured chart templates for common use cases:

```typescript
import { ChartService } from '../services/chart.service';

constructor(private chartService: ChartService) {}

ngAfterViewInit() {
  const options = this.chartService.createPriceChart(
    priceData, 
    dateCategories, 
    'Stock Price Chart'
  );
  
  const chart = new ApexCharts(this.chartContainer.nativeElement, options);
  chart.render();
}
```

## Available Chart Types

### 1. Price Chart (`createPriceChart`)
- Line chart for price data
- Includes zoom and pan functionality
- Customizable tooltips and formatting

### 2. Candlestick Chart (`createCandlestickChart`)
- OHLC candlestick chart for trading data
- Optimized for financial data visualization

### 3. Performance Chart (`createPerformanceChart`)
- Area chart for portfolio performance
- Gradient fill and smooth curves
- Currency formatting

### 4. Returns Distribution (`createReturnsDistributionChart`)
- Histogram for return distribution analysis
- Useful for risk analysis

### 5. Drawdown Chart (`createDrawdownChart`)
- Area chart for drawdown analysis
- Red color scheme for negative values

## Chart Configuration

All charts support extensive customization:

```typescript
const options = {
  series: [...],
  chart: {
    type: 'line',
    height: 400,
    zoom: { enabled: true },
    toolbar: { show: true }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  colors: ['#2563eb'],
  dataLabels: { enabled: false },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    }
  },
  xaxis: {
    categories: [...],
    type: 'datetime'
  },
  yaxis: {
    title: { text: 'Price ($)' }
  },
  tooltip: {
    x: { format: 'dd MMM yyyy' }
  }
};
```

## Best Practices

1. **Always destroy charts** when the component is destroyed:
```typescript
ngOnDestroy() {
  if (this.chart) {
    this.chart.destroy();
  }
}
```

2. **Use ViewChild** to get the chart container:
```typescript
@ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
```

3. **Render charts in ngAfterViewInit** to ensure the DOM element exists:
```typescript
ngAfterViewInit() {
  this.renderChart();
}
```

4. **Use the ChartService** for consistent styling and configuration across the application.

## Examples

### Backtest Results Component
The `BacktestResultsComponent` demonstrates a comprehensive chart implementation with:
- Multiple data series (price, moving averages)
- Interactive zoom and pan
- Custom tooltips
- Performance metrics display

### Dashboard Component
The `DashboardComponent` shows a simple performance chart with:
- Area chart with gradient fill
- Sparkline-style display
- Currency formatting

## Migration from Other Libraries

This implementation replaces:
- ❌ **ngx-charts** (removed - had dependency conflicts)
- ❌ **nivo** (no traces found)
- ✅ **ApexCharts** (current implementation)

## Resources

- [ApexCharts Documentation](https://apexcharts.com/docs/)
- [ApexCharts Examples](https://apexcharts.com/docs/chart-types/)
- [Angular Integration Guide](https://apexcharts.com/docs/angular-charts/) 