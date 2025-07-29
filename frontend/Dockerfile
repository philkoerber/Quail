FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

# Install serve to serve static files
RUN npm install -g serve

# Copy the built application contents to the dist directory
COPY --from=build /app/dist/quail-frontend/* /app/dist/

EXPOSE 4200

# Serve the application from the dist directory
CMD ["serve", "-s", "dist", "-l", "4200"] 