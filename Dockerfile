# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# API Gateway URL (set at build time via docker-compose arg)
ARG VITE_API_GATEWAY=http://localhost:8000
ENV VITE_API_GATEWAY=${VITE_API_GATEWAY}

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
