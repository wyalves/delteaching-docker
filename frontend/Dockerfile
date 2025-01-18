# Base image
FROM node:18 as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy app code and build
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
