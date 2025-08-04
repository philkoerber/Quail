# Quail - Iterative Strategy Builder

A comprehensive trading strategy development platform that leverages backtesting, machine learning, and LLM-powered improvements to create and refine trading strategies through an iterative process.

## 🏗️ Architecture Overview

The system is built with a modern microservices architecture:

- **Frontend**: Angular 16 with Tailwind CSS and ngx-charts, served with Node.js serve
- **API Layer**: NestJS with JWT authentication
- **Database**: PostgreSQL for data persistence
- **Backend Services**: 
  - Ollama for LLM management
  - LEAN Engine for backtest execution
  - scikit-learn for ML model training
- **Deployment**: Docker Compose for easy containerization

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

### Running the Application

The application supports both development and production modes with a unified Docker setup.

#### Development Mode (Recommended for development)
```bash
./run.sh dev up
```

#### Production Mode
```bash
./run.sh prod up
```

#### Other Commands
```bash
./run.sh dev down    # Stop containers
./run.sh dev build   # Build containers
./run.sh dev logs    # View logs
./run.sh dev restart # Restart containers
```

### Access the Application

Once started, you can access:
- **Frontend**: http://localhost:4200
- **API**: http://localhost:3000
- **LEAN Engine**: http://localhost:8000
- **PostgreSQL**: localhost:5433
- **Ollama**: http://localhost:11434

### Test Credentials

For testing the application, you can use these pre-created credentials:
- **Email:** `test@example.com`
- **Password:** `testpass123`

## 🧪 Testing

### Comprehensive Testing Suite

The project includes multiple testing layers to ensure reliability and functionality:

#### 1. Integration Testing
Run the complete system integration test:
```bash
python3 test_integration.py
```

This test verifies:
- ✅ All services are healthy and responding
- ✅ Lean-CLI backtest functionality
- ✅ Database connectivity and data persistence
- ✅ API endpoints accessibility
- ✅ Frontend accessibility
- ✅ Complete system integration

#### 2. LEAN CLI Testing
Test the backtest service specifically:
```bash
cd lean-cli
source venv/bin/activate
python test_lean_cli.py
```

This test verifies:
- ✅ Health check functionality
- ✅ Simple backtest execution
- ✅ Complex trading strategy processing
- ✅ Error handling and edge cases
- ✅ Results generation and storage

#### 3. Service Health Checks
Quick health verification:
```bash
# Database
docker exec quail-postgres-1 pg_isready -U quail_user -d quail_db

# Lean-CLI
curl http://localhost:8000/health

# API
curl http://localhost:3000/strategies

# Frontend
curl http://localhost:4200
```

### Test Results

All tests should pass with results like:
```
📊 Integration Test Results: 5/5 tests passed
🎉 All integration tests passed! The Quail platform is fully operational.
```

## 🐳 Docker Setup

### Overview

The setup uses separate Docker Compose files for development and production environments, providing a clean and simple approach to managing different deployment modes.

### Key Features

#### Development Mode (`docker-compose.dev.yml`)
- Hot reload for API (NestJS)
- Hot reload for Frontend (Angular)
- Hot reload for LEAN CLI (FastAPI)
- Source code volume mounts for live editing
- File watching enabled
- Development-specific environment variables

#### Production Mode (`docker-compose.yml`)
- Optimized multi-stage builds
- Minimal production images
- No development dependencies
- Static file serving for frontend
- Production-optimized commands
- No volume mounts (code baked into images)

### File Structure

```
Quail/
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration
├── run.sh                      # Easy runner script
├── api/Dockerfile              # Unified API Dockerfile
├── frontend/Dockerfile         # Multi-stage frontend Dockerfile
├── lean-cli/Dockerfile         # LEAN CLI Dockerfile
├── test_integration.py         # System integration tests
└── lean-cli/test_lean_cli.py   # LEAN CLI specific tests
```

### Usage

The `run.sh` script provides a simple interface for managing both environments:

```bash
# Development mode (with hot reload)
./run.sh dev up

# Production mode (optimized builds)
./run.sh prod up

# Stop containers
./run.sh dev down
./run.sh prod down

# View logs
./run.sh dev logs
./run.sh prod logs

# Rebuild containers
./run.sh dev build
./run.sh prod build

# Restart containers
./run.sh dev restart
./run.sh prod restart
```

### Troubleshooting

#### Clean Build
If you encounter issues, try a clean build:
```bash
./run.sh dev down
docker-compose -f docker-compose.dev.yml build --no-cache
./run.sh dev up
```

#### Reset Everything
```bash
./run.sh dev down
docker-compose -f docker-compose.dev.yml down -v  # Removes volumes
docker system prune -f  # Removes unused images
./run.sh dev build
./run.sh dev up
```

## 📁 Project Structure

```
Quail/
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration
├── run.sh                      # Easy runner script
├── test_integration.py         # System integration tests
├── api/                        # NestJS API
│   ├── src/
│   │   ├── entities/           # Database entities
│   │   ├── auth/               # Authentication module
│   │   ├── strategy/           # Strategy management
│   │   ├── backtest/           # Backtest execution
│   │   ├── lean/               # LEAN CLI integration
│   │   ├── common/
│   │   │   └── dto/            # Shared DTOs
│   │   └── main.ts             # Application entry point
│   ├── package.json
│   └── Dockerfile              # Unified Dockerfile
├── frontend/                   # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # UI components
│   │   │   ├── services/       # API services
│   │   │   └── guards/         # Route guards
│   │   ├── styles.css          # Tailwind CSS
│   │   └── main.ts
│   ├── package.json
│   └── Dockerfile              # Unified Dockerfile
├── lean-cli/                   # LEAN CLI service
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile              # Unified Dockerfile
│   ├── test_lean_cli.py        # LEAN CLI test suite
│   ├── backtest_status.json    # Persistent backtest status
│   ├── strategies/             # Generated strategy files
│   ├── results/                # Backtest results
│   └── data/                   # Market data
├── docker/
│   └── postgres/
│       └── init.sql/           # Database initialization scripts
└── README.md
```

## 🔐 Authentication

The system uses JWT-based authentication with access and refresh tokens:

- **Access Token**: 15-minute expiration
- **Refresh Token**: 7-day expiration with rotation
- **Password Hashing**: bcrypt with salt rounds of 10
- **User Registration**: Requires email, password, firstName, and lastName fields

## 📊 Database Schema

### Core Entities

- **User**: Authentication and profile information
- **Strategy**: Trading strategy definitions and metadata
- **Backtest**: Backtest results and performance metrics
- **Model**: Trained machine learning models
- **Token**: Authentication token management

## 🔄 Workflow

1. **User Registration/Login**: JWT-based authentication
2. **Strategy Creation**: Users create trading strategies with Python code
3. **Backtest Execution**: LEAN Engine service runs backtests on strategies
4. **Results Analysis**: Performance metrics are stored
5. **Strategy Refinement**: AI implements improvements and re-test
6. **Iterative Improvement**: Continuous cycle of testing and refinement

## 🛠️ API Endpoints

### Authentication
- `POST /auth/register` - User registration (requires email, password, firstName, lastName)
- `POST /auth/login` - User login (requires email, password)
- `POST /auth/refresh` - Token refresh (requires refreshToken)

### Strategies
- `GET /strategies` - List user strategies
- `POST /strategies` - Create new strategy
- `GET /strategies/:id` - Get strategy details
- `PUT /strategies/:id` - Update strategy
- `DELETE /strategies/:id` - Delete strategy

### Backtests
- `GET /backtests` - List user backtests
- `POST /backtests` - Create new backtest
- `GET /backtests/:id` - Get backtest results
- `DELETE /backtests/:id` - Delete backtest

## 🎨 Frontend Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Authentication**: Login/register forms with validation
- **Dashboard**: Overview of strategies and performance
- **Strategy Management**: CRUD operations for trading strategies
- **Backtest Visualization**: Charts and metrics display
- **Real-time Updates**: WebSocket integration for live data

## 📈 LEAN CLI Service

### Overview

A streamlined FastAPI service that integrates with the QuantConnect LEAN CLI for backtesting. This service provides a simple REST API interface to execute trading strategy backtests with persistent storage and comprehensive testing.

### Features

- **LEAN CLI Integration**: Uses the actual QuantConnect LEAN CLI for backtesting
- **Simple REST API**: Clean HTTP interface for strategy execution
- **Real Backtesting**: Executes actual backtests, not simulations
- **Persistent Storage**: JSON-based status tracking that survives restarts
- **Docker Ready**: Containerized with LEAN Engine foundation
- **Comprehensive Testing**: Full test suite for reliability
- **Error Handling**: Robust error handling and status tracking

### API Usage

#### Execute a Backtest

```bash
curl -X POST "http://localhost:8000/backtest" \
  -H "Content-Type: application/json" \
  -d '{
    "backtest_id": "my-test-123",
    "strategy_code": "from AlgorithmImports import *\nclass StrategyAlgorithm(QCAlgorithm):\n    def Initialize(self):\n        self.SetStartDate(2020, 1, 1)\n        self.SetEndDate(2021, 1, 1)\n        self.SetCash(100000)\n        self.AddEquity(\"SPY\")\n    def OnData(self, data):\n        if not self.Portfolio.Invested:\n            self.SetHoldings(\"SPY\", 1.0)"
  }'
```

#### Check Results

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

### API Endpoints

- `GET /` - Service status
- `GET /health` - Health check
- `POST /backtest` - Execute backtest
- `GET /backtest/{id}` - Get backtest results

### Strategy Code Format

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

### Data Requirements

The service requires market data in the LEAN CLI format. You can:

1. Download data using LEAN CLI: `lean data download --ticker SPY`
2. Mount a data directory: `docker run -v /path/to/data:/app/data lean-cli-service`

### Testing the LEAN CLI Service

#### Run the Test Suite
```bash
cd lean-cli
source venv/bin/activate
python test_lean_cli.py
```

#### Manual Testing
```bash
# Health check
curl http://localhost:8000/health

# Simple backtest
curl -X POST http://localhost:8000/backtest \
  -H "Content-Type: application/json" \
  -d '{"backtest_id": "test_001", "strategy_code": "print(\"Hello World\")"}'

# Check results
curl http://localhost:8000/backtest/test_001
```

### Persistent Storage

The service uses JSON-based persistent storage:
- **Status File**: `backtest_status.json` - Tracks all backtest statuses
- **Strategy Files**: `/app/strategies/{backtest_id}/strategy.py` - Generated strategy files
- **Results**: `/app/results/{backtest_id}/` - Backtest result files

This ensures that backtest status and results persist across service restarts.

## 🏗️ DTOs (Data Transfer Objects) - Modular Structure

This project follows the **modular DTO approach**, which is the most common pattern in NestJS applications.

### Structure

#### Module-Specific DTOs
Each module contains its own DTOs in a `dto/` subfolder:

```
src/
├── auth/
│   ├── dto/
│   │   ├── auth.dto.ts      # RegisterDto, LoginDto, RefreshTokenDto
│   │   └── index.ts
│   ├── auth.controller.ts
│   └── auth.service.ts
├── strategy/
│   ├── dto/
│   │   ├── strategy.dto.ts  # CreateStrategyDto, UpdateStrategyDto
│   │   └── index.ts
│   ├── strategy.controller.ts
│   └── strategy.service.ts
├── backtest/
│   ├── dto/
│   │   ├── backtest.dto.ts  # CreateBacktestDto, UpdateBacktestDto
│   │   └── index.ts
│   ├── backtest.controller.ts
│   └── backtest.service.ts
└── common/
    └── dto/
        ├── common.dto.ts    # IdParamDto, PaginationDto, ApiResponse
        ├── response.dto.ts  # Response DTOs
        └── index.ts
```

#### Shared DTOs
The `common/dto/` folder contains DTOs that are used across multiple modules:

- **`IdParamDto`**: For route parameters requiring UUID
- **`PaginationDto`**: For paginated requests
- **`ApiResponse<T>`**: Generic API response wrapper
- **`PaginatedResponse<T>`**: For paginated responses
- **Response DTOs**: `UserResponseDto`, `StrategyResponseDto`, etc.

### Benefits of This Approach

1. **Modularity**: Each module is self-contained
2. **Co-location**: DTOs are close to where they're used
3. **Clear ownership**: Easy to see which DTOs belong to which module
4. **Easier imports**: Shorter relative import paths
5. **Better encapsulation**: Module-specific DTOs stay with their module
6. **Scalability**: Easy to add new modules without affecting others

### Usage Examples

#### In Controllers
```typescript
// Module-specific DTOs
import { CreateStrategyDto, UpdateStrategyDto } from './dto';

// Shared DTOs
import { IdParamDto } from '../common/dto';

@Post()
async create(@Body() strategyData: CreateStrategyDto) {
    // strategyData is validated and typed
}
```

#### Cross-Module Usage
If you need to use a DTO from another module:

```typescript
// Import from another module
import { RegisterDto } from '../auth/dto';

// Import shared DTOs
import { IdParamDto, UserResponseDto } from '../common/dto';
```

### When to Use Each Approach

#### Use Module-Specific DTOs When:
- The DTO is only used within one module
- You want to keep modules self-contained
- The DTO is specific to that module's domain

#### Use Shared DTOs When:
- The DTO is used across multiple modules
- It's a common pattern (like ID parameters)
- It's a generic utility (like pagination)

### Best Practices

1. **Keep DTOs close to their usage** - Put them in the module's `dto/` folder
2. **Use index.ts files** - For clean imports
3. **Share common patterns** - Put reusable DTOs in `common/dto/`
4. **Be specific with naming** - Use clear, descriptive names
5. **Document validation rules** - Use meaningful error messages

## 🔧 Configuration

### Environment Variables

The application is configured through Docker Compose environment variables:

```env
# Database
DATABASE_URL=postgresql://quail_user:quail_password@postgres:5432/quail_db
POSTGRES_DB=quail_db
POSTGRES_USER=quail_user
POSTGRES_PASSWORD=quail_password

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production

# API
API_PORT=3000

# Frontend
FRONTEND_PORT=4200
```

### Database Initialization

The PostgreSQL database is automatically initialized with:
- Database creation
- User role setup with proper permissions
- Automatic table creation via TypeORM synchronization

## 🚀 Deployment

### Production Deployment

1. **Build the application:**
   ```bash
   ./run.sh prod build
   ```

2. **Deploy with production settings:**
   ```bash
   ./run.sh prod up
   ```

### Scaling

The application is designed to scale horizontally:

- **API**: Multiple instances behind a load balancer
- **Database**: PostgreSQL with read replicas
- **Frontend**: CDN distribution for static assets

## 🔍 Monitoring and Logging

- **Application Logs**: Structured logging with correlation IDs
- **Performance Metrics**: API response times and error rates
- **Database Monitoring**: Query performance and connection pools
- **Health Checks**: Endpoint monitoring for all services

## 🧪 Testing

### Backend Testing
```bash
cd api
npm run test
npm run test:e2e
```

### Frontend Testing
```bash
cd frontend
npm run test
```

### LEAN CLI Testing
```bash
cd lean-cli
python test_engine.py
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the API documentation at `/api/docs`

---

**Note**: This is a minimal foundation. The actual implementation would include more sophisticated error handling, comprehensive testing, production-ready security measures, and complete integration with LEAN CLI and Ollama services. 