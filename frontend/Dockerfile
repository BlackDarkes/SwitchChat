# Сборка
FROM node:24-alpine as build

WORKDIR /app

RUN corepack enable

COPY package* pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV API_URL=http://localhost:8000
ENV NODE_ENV=production

RUN pnpm build


# Запуск
FROM node:24-alpine AS run
WORKDIR /app

ENV API_URL=http://localhost:8000
ENV NODE_ENV=production

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

CMD [ "node", "server.js" ]