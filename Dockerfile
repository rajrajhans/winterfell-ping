# Build stage
FROM --platform=linux/amd64 node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Production stage
FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./

# Set user to non-root
USER node

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
