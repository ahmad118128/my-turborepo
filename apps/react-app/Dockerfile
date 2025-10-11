# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

# ---- Prune workspace ----
FROM base AS prune
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm turbo prune --scope=react-app --docker

# ---- Build dependencies ----
FROM base AS build
COPY --from=prune /app/out/json/ .
RUN pnpm install --frozen-lockfile

# ---- Copy source ----
COPY --from=prune /app/out/full/ .
COPY turbo.json .

# ---- Build app ----
RUN pnpm build --filter=react-app...

# ---- Production image ----
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=build /app/apps/react-app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
