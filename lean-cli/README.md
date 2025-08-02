# LEAN CLI Service

A streamlined FastAPI service that integrates with the QuantConnect LEAN CLI for backtesting. This service provides a simple REST API interface to execute trading strategy backtests.

## Features

- **LEAN CLI Integration**: Uses the actual QuantConnect LEAN CLI for backtesting
- **Simple REST API**: Clean HTTP interface for strategy execution
- **Real Backtesting**: Executes actual backtests, not simulations
- **Docker Ready**: Containerized with LEAN Engine foundation

## Quick Start

### Using Docker

```bash
# Build and run
docker build -t lean-cli-service .
docker run -p 8000:8000 lean-cli-service

# Or use docker-compose
docker-compose up lean-cli
```

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run service
uvicorn main:app --reload
```

## API Usage

### Execute a Backtest

```bash
curl -X POST "http://localhost:8000/backtest" \
  -H "Content-Type: application/json" \
  -d '{
    "backtest_id": "my-test-123",
    "strategy_code": "from AlgorithmImports import *\nclass StrategyAlgorithm(QCAlgorithm):\n    def Initialize(self):\n        self.SetStartDate(2020, 1, 1)\n        self.SetEndDate(2021, 1, 1)\n        self.SetCash(100000)\n        self.AddEquity(\"SPY\")\n    def OnData(self, data):\n        if not self.Portfolio.Invested:\n            self.SetHoldings(\"SPY\", 1.0)"
  }'
```

### Check Results

```bash
curl "http://localhost:8000/backtest/my-test-123"
```

Response:
```json
{
  "backtest_id": "my-test-123",
  "status": "completed",
  "results": {
    "totalReturn": 0.15,
    "sharpeRatio": 1.2,
    "maxDrawdown": -0.08,
    "winRate": 0.65,
    "finalPortfolioValue": 115000.0,
    "totalTrades": 1,
    "profitLoss": 15000.0
  }
}
```

## API Endpoints

- `GET /` - Service status
- `GET /health` - Health check
- `POST /backtest` - Execute backtest
- `GET /backtest/{id}` - Get backtest results

## Strategy Code Format

The service accepts Python strategy code that follows the LEAN CLI format:

```python
from AlgorithmImports import *

class StrategyAlgorithm(QCAlgorithm):
    def Initialize(self):
        self.SetStartDate(2020, 1, 1)
        self.SetEndDate(2021, 1, 1)
        self.SetCash(100000)
        self.AddEquity("SPY")
    
    def OnData(self, data):
        # Your strategy logic here
        if not self.Portfolio.Invested:
            self.SetHoldings("SPY", 1.0)
```

## Testing

Run the test script to verify functionality:

```bash
python test_engine.py
```

## Architecture

- **Base Image**: `quantconnect/lean:foundation` - Contains LEAN CLI
- **API Layer**: FastAPI service for HTTP interface
- **Execution**: Async subprocess calls to LEAN CLI
- **Results**: JSON parsing from LEAN CLI output

## Data Requirements

The service requires market data in the LEAN CLI format. You can:

1. Download data using LEAN CLI: `lean data download --ticker SPY`
2. Mount a data directory: `docker run -v /path/to/data:/app/data lean-cli-service`

## Integration

This service integrates with the main Quail application:

1. **API Service**: Sends backtest requests
2. **Database**: Stores results and metadata
3. **Frontend**: Displays progress and results

## Troubleshooting

### Common Issues

1. **Missing Data**: Ensure required market data is available in `/app/data`
2. **Strategy Errors**: Check Python syntax and LEAN CLI compatibility
3. **Timeout**: Backtests may take time depending on data range and complexity

### Logs

```bash
docker logs lean-cli-service
```

## Next Steps

1. **Data Management**: Set up automated data downloads
2. **Performance**: Optimize for concurrent backtests
3. **Monitoring**: Add metrics and progress tracking
4. **Caching**: Cache results for repeated strategies 