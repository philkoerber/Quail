#!/bin/bash

# Quail Docker Runner Script
# Usage: ./run.sh [dev|prod] [up|down|build|logs]

MODE=${1:-dev}
ACTION=${2:-up}

# Set docker-compose file based on mode
if [ "$MODE" = "dev" ]; then
    COMPOSE_FILE="docker-compose.dev.yml"
    echo "🚀 Starting Quail in DEVELOPMENT mode..."
elif [ "$MODE" = "prod" ]; then
    COMPOSE_FILE="docker-compose.yml"
    echo "🚀 Starting Quail in PRODUCTION mode..."
else
    echo "❌ Invalid mode. Use 'dev' or 'prod'"
    exit 1
fi

# Check if docker-compose file exists
if [ ! -f "$COMPOSE_FILE" ]; then
    echo "❌ Docker Compose file $COMPOSE_FILE not found!"
    exit 1
fi

# Run docker-compose command
case $ACTION in
    "up")
        docker-compose -f "$COMPOSE_FILE" up -d
        echo "✅ Quail started in $MODE mode!"
        echo "📊 API: http://localhost:3000"
        echo "🌐 Frontend: http://localhost:4200"
        echo "📈 LEAN CLI: http://localhost:8000"
        echo "🤖 Ollama: http://localhost:11434"
        ;;
    "down")
        docker-compose -f "$COMPOSE_FILE" down
        echo "🛑 Quail stopped!"
        ;;
    "build")
        docker-compose -f "$COMPOSE_FILE" build
        echo "🔨 Build completed!"
        ;;
    "logs")
        docker-compose -f "$COMPOSE_FILE" logs -f
        ;;
    "restart")
        docker-compose -f "$COMPOSE_FILE" down
        docker-compose -f "$COMPOSE_FILE" up -d
        echo "🔄 Quail restarted in $MODE mode!"
        ;;
    *)
        echo "❌ Invalid action. Use 'up', 'down', 'build', 'logs', or 'restart'"
        exit 1
        ;;
esac 