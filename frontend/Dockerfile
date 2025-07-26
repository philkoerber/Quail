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

COPY --from=build /app/dist/quail-frontend /app/dist

EXPOSE 4200

CMD ["serve", "-s", "dist", "-l", "4200"] 