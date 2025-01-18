# Base image
FROM node:18

# Define app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Expose port and run
EXPOSE 3000
CMD ["node", "server.js"]
