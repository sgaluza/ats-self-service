# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm --filter @ats/api prisma:generate

# Build packages
RUN pnpm --filter @ats/types build
RUN pnpm --filter @ats/utils build
RUN pnpm --filter @ats/api build

# Production stage
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy built files
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Install docker CLI for managing WireGuard containers
RUN apk add --no-cache docker-cli

# Expose port
EXPOSE 3001

# Run migrations and start server
CMD ["sh", "-c", "cd apps/api && pnpm prisma migrate deploy && node dist/index.js"]
