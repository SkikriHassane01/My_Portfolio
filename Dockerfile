FROM python:3.12-slim

WORKDIR /BackEnd/main

COPY requirements.txt .

RUN pip install --upgrade pip 

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "main:app"]