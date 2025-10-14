#build
#imagen de node.js 20 basada en alpine (ligera)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# etapa2 :producción con Nginx
# aca ya no se necesita node, solo un sv web para correr archivos estáticos
# se considera una configuracion de nginx propia
FROM nginx:1.27-alpine

#crear directorios necesarios
RUN mkdir -p /var/cache/nginx/client_temp

#copiar archivos estáticos y configuración
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

#puerto
EXPOSE 80
