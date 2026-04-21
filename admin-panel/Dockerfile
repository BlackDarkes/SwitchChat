# Сборка
FROM node:24-alpine as build

WORKDIR /app

RUN corepack enable

COPY package* pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build


# Запуск
FROM nginx:alpine as run

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]