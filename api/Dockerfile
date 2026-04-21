# Сборка
FROM node:24-alpine as build

WORKDIR /app

RUN corepack enable

RUN pnpm install

COPY package* pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . . 

RUN pnpm build


# Запуск
FROM node:24-alpine as run

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000
ENV HOST=0.0.0.0

COPY package* pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 8000

CMD [ "node", "dist/main.js" ]