# Сборка
FROM node:24-alpine as build

WORKDIR /app

RUN corepack enable

COPY package* pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . . 

RUN pnpm prisma generate

RUN pnpm build


# Запуск
FROM node:24-alpine as run

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000
ENV HOST=0.0.0.0

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build /app/prisma ./prisma

RUN npx prisma generate

EXPOSE 8000

CMD [ "node", "dist/src/main.js" ]