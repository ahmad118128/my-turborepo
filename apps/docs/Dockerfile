# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable \
    && corepack prepare pnpm@latest --activate \
    && apk add --no-cache libc6-compat

# ---- Builder ----
FROM base AS builder
WORKDIR /app

# Copy root and app package files
COPY pnpm-lock.yaml package.json ./
COPY apps/docs/package.json ./apps/docs/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all files for build
COPY . .

# Build Next.js app as standalone
RUN pnpm build --filter=docs

# ---- Runner ----
FROM node:22-alpine AS runner
WORKDIR /app

# Enable pnpm
RUN corepack enable \
    && corepack prepare pnpm@latest --activate

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy standalone build and public assets
COPY --from=builder /app/apps/docs/.next/standalone/ ./
COPY --from=builder /app/apps/docs/public ./public

# Install only production deps for standalone
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/apps/docs/package.json ./apps/docs/package.json
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

EXPOSE 3000
CMD ["node", "apps/docs/server.js"]
