# LEAN Engine Service Dockerfile
# Uses the QuantConnect LEAN Engine foundation for backtesting

# Use the LEAN Engine foundation as base
FROM quantconnect/lean:foundation

# Install additional Python packages for our API service
RUN pip install --no-cache-dir \
    fastapi==0.116.1 \
    uvicorn==0.35.0 \
    pydantic==2.11.7 \
    requests==2.32.4 \
    python-multipart==0.0.20 \
    aiofiles==24.1.0 \
    psutil==7.0.0

# Set working directory
WORKDIR /app

# Copy our API service
COPY . .

# Create directories for strategies and results
RUN mkdir -p /app/strategies /app/results /app/data

# Expose port for the API service
EXPOSE 8000

# Start the LEAN Engine API service
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 