# Development Guide

## Quick Start for Development

### Option 1: Docker Development (Recommended)
This approach uses Docker with volume mounts for hot reloading:

```bash
# Start development environment with hot reload
npm run dev

# Stop development environment
npm run dev:down

# View logs
npm run dev:logs

# Reset database
npm run db:reset
```

**Benefits:**
- ✅ Code changes are detected automatically
- ✅ Hot reload for both API and frontend
- ✅ Consistent environment across team
- ✅ Database and services included

### Option 2: Local Development
Run services directly on your machine:

```bash
# Terminal 1: Start PostgreSQL (if you have it installed)
# Or use the Docker PostgreSQL only:
docker-compose -f docker-compose.dev.yml up postgres

# Terminal 2: Start API
cd api
npm install
npm run start:dev

# Terminal 3: Start Frontend
cd frontend
npm install
npm start
```

**Benefits:**
- ✅ Fastest development experience
- ✅ Direct access to node_modules
- ✅ Better debugging capabilities
- ✅ IDE integration works better

### Option 3: Production Docker
For testing production builds:

```bash
npm run prod
npm run prod:down
```

## Development Workflow

1. **Start Development Environment:**
   ```bash
   npm run dev
   ```

2. **Make Code Changes:**
   - API changes in `api/src/` will auto-reload
   - Frontend changes in `frontend/src/` will auto-reload
   - Database changes require restart: `npm run db:reset`

3. **Access Services:**
   - Frontend: http://localhost:4200
   - API: http://localhost:3000
   - Database: localhost:5433 (user: quail_user, db: quail_db)
   - Ollama: http://localhost:11434

## File Structure

```
Quail/
├── api/                 # NestJS API
│   ├── src/            # Source code (auto-reloads)
│   ├── Dockerfile      # Production build
│   └── Dockerfile.dev  # Development build
├── frontend/           # Angular Frontend
│   ├── src/           # Source code (auto-reloads)
│   ├── Dockerfile     # Production build
│   └── Dockerfile.dev # Development build
├── docker-compose.yml      # Production setup
├── docker-compose.dev.yml  # Development setup
└── package.json           # Root scripts
```

## Troubleshooting

### Port Conflicts
If ports are already in use:
```bash
# Check what's using the ports
lsof -i :3000
lsof -i :4200
lsof -i :5433

# Kill processes or change ports in docker-compose.dev.yml
```

### Database Issues
```bash
# Reset database completely
npm run db:reset
```

### Node Modules Issues
```bash
# Rebuild containers
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build
```

### Hot Reload Not Working
- Ensure you're using `docker-compose.dev.yml`
- Check that volume mounts are working: `docker-compose -f docker-compose.dev.yml exec api ls -la`
- Restart the development environment

## Environment Variables

Development environment variables are set in `docker-compose.dev.yml`:
- `NODE_ENV=development`
- `DATABASE_URL=postgresql://quail_user:quail_password@postgres:5432/quail_db`
- `JWT_SECRET=your-super-secret-jwt-key-change-in-production`

## Best Practices

1. **Use Development Docker for Team Consistency**
2. **Use Local Development for Fast Iteration**
3. **Test Production Builds Regularly**
4. **Keep Database Schema in Version Control**
5. **Use Environment Variables for Configuration** 