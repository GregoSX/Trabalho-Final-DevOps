# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy all local files to the image
COPY . .

# Expose port 8080 for the Vue.js development server
EXPOSE 8080

# Run the development server
CMD ["npm", "run", "serve"]