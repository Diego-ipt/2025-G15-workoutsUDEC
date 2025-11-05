#!/bin/sh

set -e

# Scripts de initial setup
echo "Running database migrations..."
python initial_setup.py

echo "Creating admin and users if it doesn't exist..."
python initial_data.py

# Esto reemplaza el proceso del script de shell con el comando
# asi uvicorn es el proceso principal y deberia de ejecutarse la api correcamente
exec "$@"
