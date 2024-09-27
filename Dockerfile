# Backend stage (Python Flask)
FROM python:3.12-slim AS backend

WORKDIR /BackEnd

COPY requirements.txt .

RUN pip install --upgrade pip 

RUN mkdir -p /var/tmp/pip-tmp && \
    TMPDIR=/var/tmp/pip-tmp pip install --no-cache-dir -r requirements.txt

COPY . .

# Frontend stage (React)
FROM node:18-alpine AS frontend

WORKDIR /FrontEnd

COPY ./FrontEnd/package*.json ./
RUN npm install

COPY ./FrontEnd .
RUN npm run build

# Final stage (Combine frontend and backend)
FROM python:3.12-slim

WORKDIR /BackEnd

# Copy Python requirements and install
COPY --from=backend /BackEnd /BackEnd

# Copy React build files
COPY --from=frontend /FrontEnd/build /BackEnd/FrontEnd/dist

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "main:app"]