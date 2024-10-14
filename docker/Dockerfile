# Etapa de build
FROM node:20-alpine AS build

WORKDIR /app

COPY ../package.json ./
COPY ../tsconfig.json ./
COPY ../tsconfig.build.json ./
COPY ../yarn.lock ./

RUN yarn install

COPY ../src ./src

RUN yarn build

# Etapa de produção
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json .

ENV NODE_ENV=production

EXPOSE 3002

CMD ["node", "dist/main"]