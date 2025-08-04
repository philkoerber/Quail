# Build argument to determine environment
ARG NODE_ENV=production

FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

COPY . .

# Build the application
RUN npm run build

# Development stage
FROM node:18-alpine as development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies for development
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

EXPOSE 4200

# Development command with hot reload
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]

# Production stage
FROM node:18-alpine as production

WORKDIR /app

# Install serve to serve static files
RUN npm install -g serve

# Copy the built application contents from build stage
COPY --from=build /app/dist/quail-frontend/* /app/dist/

EXPOSE 4200

# Serve the application from the dist directory
CMD ["serve", "-s", "dist", "-l", "4200"] 