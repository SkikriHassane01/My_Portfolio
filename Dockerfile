# Backend stage (Python Flask)
FROM python:3.12-slim AS backend

WORKDIR /My_portfolio/BackEnd/

# Copy requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip 
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory
COPY ./BackEnd /My_portfolio/BackEnd

# Frontend stage (React)
FROM node:18-alpine AS frontend

WORKDIR /My_portfolio/FrontEnd

COPY ./FrontEnd/package*.json ./
RUN npm install

COPY ./FrontEnd . 
RUN npm run build

# Final stage (Combine frontend and backend)
FROM python:3.12-slim

WORKDIR /My_portfolio/BackEnd

# Copy the backend directory, including the requirements file
COPY --from=backend /My_portfolio/BackEnd /My_portfolio/BackEnd

# Create a virtual environment
RUN python -m venv venv

# Install requirements directly in the virtual environment
RUN ./venv/bin/pip install --no-cache-dir -r /My_portfolio/BackEnd/requirements.txt

# Copy React build files from the frontend stage
COPY --from=frontend /My_portfolio/FrontEnd/dist /My_portfolio/FrontEnd/dist

# Expose the backend port
EXPOSE 8000

# Directly call Gunicorn using the Python interpreter in the virtual environment
CMD ["./venv/bin/gunicorn", "-b", "0.0.0.0:8000", "BackEnd.main:app"]
