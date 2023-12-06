# Use an official Node runtime as a parent image
FROM node:14 as builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY todolist/package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy all local files to the image
COPY todolist/ .

# Build the Vue app
RUN npm run build

# Use a smaller base image for the final stage
FROM nginx:alpine

# Copy the built app from the builder stage to the nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the world outside this container
EXPOSE 80

# CMD is not needed for nginx, it will automatically start
