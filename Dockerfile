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

# Activate the virtual environment and install requirements
RUN . venv/bin/activate && pip install --no-cache-dir -r /My_portfolio/BackEnd/requirements.txt

# Copy React build files from the frontend stage
COPY --from=frontend /My_portfolio/FrontEnd/dist /My_portfolio/FrontEnd/dist

EXPOSE 8000

# Adjust the command to run Gunicorn from the virtual environment
CMD ["bash", "-c", "source venv/bin/activate && gunicorn -b 0.0.0.0:8000 BackEnd.main:app"]

