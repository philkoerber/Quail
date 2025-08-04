# Build argument to determine environment
ARG NODE_ENV=production

# LEAN CLI Service Dockerfile
FROM quantconnect/lean:foundation

# Install FastAPI dependencies
RUN pip install --no-cache-dir \
    fastapi==0.116.1 \
    uvicorn[standard]==0.35.0 \
    pydantic==2.11.7 \
    requests==2.32.4

# Set working directory
WORKDIR /app

# Copy service files
COPY main.py .
COPY requirements.txt .

# Create directories
RUN mkdir -p /app/strategies /app/results /app/data

# Expose port
EXPOSE 8000

# Start service with or without reload based on environment
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 