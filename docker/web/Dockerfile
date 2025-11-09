# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build packages
RUN pnpm --filter @ats/types build
RUN pnpm --filter @ats/utils build
RUN pnpm --filter @ats/ui build
RUN pnpm --filter @ats/web build

# Production stage
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy built files
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["pnpm", "--filter", "@ats/web", "start"]
