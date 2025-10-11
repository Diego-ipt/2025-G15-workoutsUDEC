# Archivo: workouts_udec_backend/Dockerfile

# --- Builder ---
# Imagen de docker de python 3.11, pero ligero para optimizar el espacio.
FROM python:3.11-slim as builder

# Establecemos el directorio de trabajo del contenedor
WORKDIR /app

# Instalamos una dependencia necesaria de Python
RUN apt-get update && apt-get install -y build-essential

# Copiamos solo el archivo de requerimientos para aprovechar el cache de Docker
COPY requirements.txt .

# Instalamos las dependencias
RUN pip install --no-cache-dir -r requirements.txt


# --- Produccion ---
# Imagen final (de produccion)
FROM python:3.11-slim

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos las dependencias instaladas anteriormente
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copiamos el codigo de backend
COPY . .

# Copiamos entrypoint.sh y aseguramos line endings Unix y permisos ejecutables
COPY entrypoint.sh .
RUN apt-get update && apt-get install -y dos2unix && dos2unix ./entrypoint.sh && chmod +x ./entrypoint.sh && apt-get remove -y dos2unix && apt-get autoremove -y
ENTRYPOINT [ "./entrypoint.sh" ]

# El servidor Uvicorn se ejecutará en el puerto 8000, así que lo exponemos
EXPOSE 8000

# Comando para iniciar la aplicación.
# Host 0.0.0.0 importante que sea accesible desde fuera del contenedor.
# Crea el usuario admin antes que nada y luego corre la API con uvicorn
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]