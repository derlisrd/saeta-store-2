# syntax=docker/dockerfile:1

# ---------- Stage 1: build del frontend con Vite ----------
FROM node:20-alpine AS frontend
WORKDIR /app

COPY frontend/package*.json frontend/.npmrc ./
RUN npm ci || npm install

COPY frontend/ ./

ARG VITE_BASE_URL=/admin
ARG VITE_API_URL_END_POINT=/api/v1/
ARG VITE_X_API_TOKEN
ARG VITE_SECRETO
ARG VITE_WEBSITE_NAME=Saeta
ARG VITE_APP_NAME="Saeta Store"
ARG VITE_ICON=rocket

ENV VITE_BASE_URL=$VITE_BASE_URL \
    VITE_API_URL_END_POINT=$VITE_API_URL_END_POINT \
    VITE_X_API_TOKEN=$VITE_X_API_TOKEN \
    VITE_SECRETO=$VITE_SECRETO \
    VITE_WEBSITE_NAME=$VITE_WEBSITE_NAME \
    VITE_APP_NAME=$VITE_APP_NAME \
    VITE_ICON=$VITE_ICON

RUN npm run build

# ---------- Stage 2: nginx ----------
FROM nginx:alpine

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /app/dist /usr/share/nginx/html/admin

EXPOSE 80
