#build
#imagen de node.js 20 basada en alpine (ligera)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# etapa2 :producción con Nginx
# aca ya no se necesita node, solo un sv web para correr archivos estáticos
# se considera una configuracion de nginx propia
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 

# seguridad: usuario no-root. evita que el contenedor corra como usuario root
RUN adduser -D appuser
USER appuser
