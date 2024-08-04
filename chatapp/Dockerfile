# Base image
FROM python:3.9

# Install git, postgresql-client, and other required libraries
RUN apt-get update && apt-get install -y \
    git \
    libgl1-mesa-glx \
    postgresql-client

# Set work directory
WORKDIR /app

COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# Copy project
COPY . /app/