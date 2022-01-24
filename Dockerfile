FROM node:14.16.0 AS builder
WORKDIR /usr/src/app
COPY package* ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.20-alpine
WORKDIR /usr/share/nginx/biseo
COPY --from=builder /usr/src/app/dist ./
COPY ./nginx/nginx-prod.conf /etc/nginx/conf.d/default.conf
