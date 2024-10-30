# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate the build of the application
RUN npm run build --prod


# Stage 2: Serve app with nginx server

# Use an HTTP server to serve the Angular application
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist/frontend/browser/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80
