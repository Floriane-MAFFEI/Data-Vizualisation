# Use official node image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate the build of the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the server using the production build
CMD ["node", "dist/main"]
