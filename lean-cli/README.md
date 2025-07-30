# LEAN CLI Service

A FastAPI service that integrates with the QuantConnect LEAN CLI for backtesting. This service provides a REST API interface to execute trading strategy backtests using the LEAN CLI.

## Features

- **LEAN CLI Integration**: Uses the QuantConnect LEAN CLI for backtesting
- **RESTful API**: Clean HTTP interface for integration with other services
- **Strategy Code Execution**: Handles Python strategy code execution
- **Results Processing**: Returns comprehensive performance metrics
- **Docker Ready**: Fully containerized with LEAN Engine foundation

## Architecture

This service uses the QuantConnect LEAN Engine foundation Docker image and adds a FastAPI layer on top to provide HTTP access to backtesting capabilities.

### Components

1. **LEAN Engine Foundation**: Base image with all LEAN CLI dependencies
2. **FastAPI Service**: HTTP API layer for backtest management
3. **Strategy Execution**: Python strategy code execution via LEAN CLI
4. **Results Processing**: Parsing and formatting of backtest results

## API Endpoints

### Health Check
- `GET /` - Service status
- `GET /health` - Health check endpoint

### Backtest Management
- `POST /backtest` - Execute a backtest with LEAN CLI
- `GET /backtest/{backtest_id}` - Get backtest results

## Usage

### Executing a Backtest

```bash
curl -X POST "http://localhost:8000/backtest" \
  -H "Content-Type: application/json" \
  -d '{
    "backtest_id": "existing-backtest-uuid",
    "strategy_code": "from AlgorithmImports import *\nclass StrategyAlgorithm(QCAlgorithm):\n    def Initialize(self):\n        self.SetStartDate(2020, 1, 1)\n        self.SetEndDate(2021, 1, 1)\n        self.SetCash(100000)\n        self.AddEquity(\"SPY\")",
    "start_date": "2020-01-01",
    "end_date": "2021-01-01",
    "initial_capital": 100000
  }'
```

### Getting Backtest Results

```bash
curl "http://localhost:8000/backtest/{backtest_id}"
```

Response:
```json
{
  "backtest_id": "uuid-string",
  "status": "completed",
  "results": {
    "totalReturn": 0.15,
    "sharpeRatio": 1.2,
    "maxDrawdown": -0.08,
    "winRate": 0.65,
    "finalPortfolioValue": 115000.0
  },
  "performance": {
    "totalReturn": 0.15,
    "sharpeRatio": 1.2,
    "maxDrawdown": -0.08,
    "winRate": 0.65
  }
}
```

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
        pass
```

## Configuration

The service uses the following environment variables:

- `LEAN_DATA_DIR`: Directory for market data (default: `/app/data`)
- `LEAN_RESULTS_DIR`: Directory for backtest results (default: `/app/results`)
- `LEAN_STRATEGIES_DIR`: Directory for strategy files (default: `/app/strategies`)

## Docker

The service is containerized using the LEAN Engine foundation:

```bash
# Build the service
docker build -t lean-cli-service .

# Run the service
docker run -p 8000:8000 lean-cli-service
```

## Integration

This service integrates with the main Quail application:

1. **API Service**: Sends backtest requests to this service
2. **Database**: Stores backtest results and metadata
3. **Frontend**: Displays backtest progress and results

## Development

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn main:app --reload
```

### Testing

```bash
# Run tests
python test_engine.py
```

## Data Requirements

The LEAN CLI requires market data to execute backtests. You'll need to:

1. **Download Market Data**: Use LEAN CLI to download required data
2. **Configure Data Sources**: Set up data providers for live data
3. **Data Format**: Ensure data is in the correct LEAN CLI format

## Performance

- **Backtest Duration**: Depends on strategy complexity and data range
- **Memory Usage**: Varies based on data size and strategy requirements
- **Concurrent Backtests**: Limited by available system resources

## Troubleshooting

### Common Issues

1. **Missing Data**: Ensure required market data is available
2. **Strategy Errors**: Check Python syntax and LEAN CLI compatibility
3. **Memory Issues**: Monitor system resources during backtesting

### Logs

Check container logs for detailed error information:

```bash
docker logs lean-cli-service
```

## Next Steps

1. **Data Integration**: Set up market data sources
2. **Performance Optimization**: Optimize for concurrent backtests
3. **Advanced Features**: Add progress tracking and real-time updates
4. **Monitoring**: Add metrics and alerting

This service provides a production-ready integration with the QuantConnect LEAN CLI for real algorithmic trading backtesting! 