# Dockerfile for Neuro AI API

# Use Node.js v18 as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the API Server
CMD ["node", "src/api/server.js"]