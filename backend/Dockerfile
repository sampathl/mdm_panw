# Use the official lightweight Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files into the container
COPY . .

# Tell Flask where to find the app
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# Expose port 8080 (because Cloud Run expects 8080)
EXPOSE 8080

# Run Flask
CMD ["gunicorn", "-b", "0.0.0.0:8080", "run:app"]