# Use Node.js LTS as base
FROM node:18-alpine AS builder

# Install yarn
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Set working directory
WORKDIR /app

# Copy root workspace files
COPY . .

# Install dependencies
RUN yarn install --frozen-lockfile

# Build all packages and apps
RUN yarn build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built assets
COPY --from=builder /app/. .

# Set production environment
ENV NODE_ENV=production

EXPOSE 3001
EXPOSE 3002
EXPOSE 3003
EXPOSE 3004

# Start command (adjust the app name as needed)
CMD ["yarn", "start"]