#!/bin/sh

set -e

# Scripts de initial setup
echo "Running database migrations..."
python -m initial_setup

echo "Creating admin and users if it doesn't exist..."
echo "Creating exercises and templates if it doesn't exist..."
python -m initial_data

# Esto reemplaza el proceso del script de shell con el comando
# asi uvicorn es el proceso principal y deberia de ejecutarse la api correcamente
exec "$@"
