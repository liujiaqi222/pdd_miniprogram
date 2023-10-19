# 构建
FROM node:18.17-alpine3.17 as build-stage
WORKDIR /server
COPY ./package.json  ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
ARG port=4000

# 生成
FROM node:18.17-alpine3.17 as production-stage
WORKDIR /server
COPY --from=build-stage ./server/dist ./
COPY ./package.json  ./package-lock.json .env ./
RUN npm install --production
ENV PORT=$port
EXPOSE ${port}
CMD ["node", "app.js"]









