# ----- IMAGEN BASE -----
FROM python:3.11-slim

# ----- DIRECTORIO DE TRABAJO -----
WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=utf-8

# ----- COPIAR DEPENDENCIAS -----
COPY requirements.txt /app

# ----- DEPENDENCIAS -----
RUN pip install -r requirements.txt

# ----- COPIAR CÓDIGO FUENTE -----
COPY . /app

CMD ["python", "__main__.py"]