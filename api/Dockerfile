FROM node:18-alpine

# Build argument to determine environment
ARG NODE_ENV=production

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies based on environment
RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install; \
    else \
        npm ci --only=production; \
    fi

# Copy source code
COPY . .

# Build the application in production mode
RUN if [ "$NODE_ENV" = "production" ]; then \
        npm run build; \
    fi

EXPOSE 3000

# Default command (can be overridden in docker-compose)
CMD ["npm", "run", "start:prod"] 