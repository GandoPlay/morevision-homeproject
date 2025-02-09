# Stage 1
FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=build /app/dist/web/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# the app will be using Port 80 while running
EXPOSE 80