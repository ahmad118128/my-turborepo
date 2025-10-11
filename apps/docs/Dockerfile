# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable \
    && apk add --no-cache libc6-compat

# ---- Prune workspace ----
FROM base AS prune
COPY . .
ENV CI=true
RUN pnpm install --frozen-lockfile
RUN pnpm turbo prune --scope=docs --docker

# ---- Build stage ----
FROM base AS build
# کپی json خروجی prune برای نصب dependencyها
COPY --from=prune /app/out/json/ .
ENV CI=true
RUN pnpm install --frozen-lockfile

# کپی کل source برای build پروژه
COPY --from=prune /app/out/full/ .
COPY turbo.json .
RUN pnpm build --filter=docs...

# ---- Production image ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# فقط فایل‌های مورد نیاز برای اجرا
COPY --from=build /app/apps/docs/.next ./.next
COPY --from=build /app/apps/docs/public ./public
COPY --from=build /app/apps/docs/package.json ./package.json

# کپی node_modules production که در build stage تولید شده
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["pnpm", "start"]
