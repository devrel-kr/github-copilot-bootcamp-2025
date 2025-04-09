FROM python:3.9-slim

WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create a non-root user for security
RUN useradd -m appuser
USER appuser

# Create a volume for the SQLite database to persist data
VOLUME /app/data

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Run the application with Uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]