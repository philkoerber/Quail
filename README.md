# Quail - Iterative Strategy Builder

A comprehensive trading strategy development platform that leverages backtesting, machine learning, and LLM-powered suggestions to create and refine trading strategies through an iterative process.

## 🏗️ Architecture Overview

The system is built with a modern microservices architecture:

- **Frontend**: Angular 16 with Tailwind CSS and ngx-charts
- **API Layer**: NestJS with JWT authentication
- **Database**: PostgreSQL for data persistence
- **Backend Services**: 
  - Ollama for LLM management
  - LEAN CLI for backtesting
  - scikit-learn for ML model training
- **Deployment**: Docker Compose for easy containerization

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

### Running the Application

1. **Clone and navigate to the project:**
   ```bash
   cd Quail
   ```

2. **Start all services with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:4200
   - API: http://localhost:3000
   - PostgreSQL: localhost:5432
   - Ollama: http://localhost:11434

### Development Setup

For local development without Docker:

#### Backend (NestJS API)

```bash
cd api
npm install
npm run start:dev
```

#### Frontend (Angular)

```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
Quail/
├── docker-compose.yml          # Main orchestration file
├── api/                        # NestJS API
│   ├── src/
│   │   ├── entities/           # Database entities
│   │   ├── auth/               # Authentication module
│   │   ├── strategy/           # Strategy management
│   │   ├── backtest/           # Backtest execution
│   │   └── main.ts             # Application entry point
│   ├── package.json
│   └── Dockerfile
├── frontend/                   # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # UI components
│   │   │   ├── services/       # API services
│   │   │   └── guards/         # Route guards
│   │   ├── styles.css          # Tailwind CSS
│   │   └── main.ts
│   ├── package.json
│   └── Dockerfile
└── README.md
```

## 🔐 Authentication

The system uses JWT-based authentication with access and refresh tokens:

- **Access Token**: 15-minute expiration
- **Refresh Token**: 7-day expiration with rotation
- **Password Hashing**: bcrypt with salt rounds of 10

## 📊 Database Schema

### Core Entities

- **User**: Authentication and profile information
- **Strategy**: Trading strategy definitions and metadata
- **Backtest**: Backtest results and performance metrics
- **Model**: Trained machine learning models
- **Token**: Authentication token management
- **Metric**: Detailed performance metrics

## 🔄 Workflow

1. **User Registration/Login**: JWT-based authentication
2. **Strategy Creation**: Users create trading strategies with Python code
3. **Backtest Execution**: LEAN CLI runs backtests on strategies
4. **Results Analysis**: Performance metrics are calculated and stored
5. **LLM Suggestions**: Ollama generates improvement suggestions based on results
6. **Strategy Refinement**: Users implement suggestions and re-test
7. **Iterative Improvement**: Continuous cycle of testing and refinement

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh

### Strategies
- `GET /api/strategies` - List user strategies
- `POST /api/strategies` - Create new strategy
- `GET /api/strategies/:id` - Get strategy details
- `PUT /api/strategies/:id` - Update strategy
- `DELETE /api/strategies/:id` - Delete strategy
- `POST /api/strategies/:id/suggestions` - Get improvement suggestions

### Backtests
- `GET /api/backtests` - List user backtests
- `POST /api/backtests` - Create new backtest
- `GET /api/backtests/:id` - Get backtest results
- `DELETE /api/backtests/:id` - Delete backtest

## 🎨 Frontend Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Authentication**: Login/register forms with validation
- **Dashboard**: Overview of strategies and performance
- **Strategy Management**: CRUD operations for trading strategies
- **Backtest Visualization**: Charts and metrics display (ngx-charts)
- **Real-time Updates**: WebSocket integration for live data

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://quail_user:quail_password@postgres:5432/quail_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production

# API
API_PORT=3000

# Frontend
FRONTEND_PORT=4200
```

## 🚀 Deployment

### Production Deployment

1. **Build the application:**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Deploy with production settings:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
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