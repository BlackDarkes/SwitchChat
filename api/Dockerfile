# Сборка
FROM node:24-alpine as build

WORKDIR /app

RUN corepack enable

COPY package* pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . . 

RUN pnpm build

RUN pnpm prune --prod


# Запуск
FROM node:24-alpine as run

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000
ENV HOST=0.0.0.0

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 8000

CMD [ "node", "dist/main.js" ]