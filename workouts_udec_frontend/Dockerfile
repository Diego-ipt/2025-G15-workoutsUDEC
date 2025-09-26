#build
#imagen de node.js 20 basada en alpine (ligera)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# etapa2 :producción con Nginx
# aca ya no se necesita node, solo un sv web para correr archivos estáticos
# se considera una configuracion de nginx propia
FROM nginx:1.27-alpine

# Crear usuario antes de usarlo
RUN adduser -D appuser

# Crear directorio y asignar permisos
RUN mkdir -p /var/cache/nginx/client_temp && \
    mkdir -p /tmp && \
    echo "pid /tmp/nginx.pid;" > /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cambiar a usuario no-root
#USER appuser
