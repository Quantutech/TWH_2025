# Use the official Node.js 22 alpine image as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
# Only copy the package.json and yarn.lock to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
