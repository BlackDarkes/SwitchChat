# Сборка
FROM node:24-alpine as build

WORKDIR /app

RUN corepack enable

COPY package* pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

ENV NODE_ENV=production
ENV API_URL=http://localhost:8000

RUN pnpm build


# Запуск
FROM node:24-alpine AS run
WORKDIR /app

ENV NODE_ENV=production
ENV API_URL=http://localhost:8000

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

CMD [ "node", "server.js" ]